import style from "../styles/utils.module.css";
import { useState } from "react";
import table from "../components/_TableManager";

import { client } from "../libs/client";

var https = require("https");

const url = "https://api.takatsuki.club/clubsystem/v1/user/0";

export async function getServerSideProps() {
    const data = await client.get({ endpoint: "status" });
    return {
        props: {
            member: data,
        },
    };
}
//const memberData = require("../components/members.json"); //別のAPIから取得するため仮置きのjson

export default function Home({ member }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let idList = new Array();

    member.contents.map((value) => {
        idList.push(value.memberID);
    });

    const [id, setId] = useState("");

    const findId = (targetValue) => {
        var memberID = idList.find((value) => value == targetValue);
        if (memberID == undefined) {
            return "IDが存在しません";
        }
        return "IDが存在します";
    };

    const [searchedText, setST] = useState("検索待機中");
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctID, setCorrectID] = useState(0);

    const onSearch = async () => {
        setST(findId(id));
        if (findId(id) == "IDが存在します") {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        let searchedID;
        setCorrectID(id);
        member.contents.map((value) => {
            if (value.memberID == id) {
                searchedID = value.id;
            }
        });
        console.log(client);
    };

    const onJoin = () => {
        // 入室時処理
        member.contents.map((value) => {
            console.log(value);
        });
    };
    const onLeave = () => {
        let leaveMember;
        // 退室時処理
    };
    const onView = () => {
        //表示処理
        const btn = document.getElementById("test");
        console.log(btn);
        btn.style.visibility = "visible";
    };
    return (
        <>
            <span>
                <h1 className={style.main}>電物出欠確認システム</h1>
                <p className={style.date}>
                    {year}年{month}月{day}日{hour}時{minutes}分
                </p>
                <div className={style.buttons}>
                    <button onClick={onJoin} className={style.join}>
                        入室
                    </button>
                    <button onClick={onLeave} className={style.leave}>
                        退室
                    </button>
                    <button onClick={onSearch} className={style.search}>
                        検索
                    </button>
                    <input
                        type="text"
                        placeholder="ID"
                        className={style.idInput}
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                    ></input>
                    <p className={style.viewID}>{searchedText}</p>
                    <p className={style.viewID}>{correctID}</p>
                </div>
                <div className={style.buttons}>
                    <button onClick={onView} className={style.view}>
                        表示
                    </button>
                </div>
                <div className={style.hide} id="test">
                    <table className={style.tableDesign}>
                        <caption className={style.title}>部員一覧</caption>
                        <thead>
                            <tr className={style.thDesign}>
                                <th>名前</th>
                                <th>年齢</th>
                                <th>学籍ID</th>
                                <th>活動分野</th>
                                <th>ステータス</th>
                            </tr>
                        </thead>
                        <tbody>
                            {member.contents.map((member) => {
                                return table(
                                    member.name,
                                    member.age,
                                    member.memberID,
                                    member.category,
                                    member.isActive
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </span>
        </>
    );
}

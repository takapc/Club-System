import style from "../styles/utils.module.css";
import { useState } from "react";
import table from "./_TableManager.js";

const memberData = require("./members.json"); //別のAPIから取得するため仮置きのjson

export default function Home() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let idList = new Array();

    memberData.member.map((value) => {
        idList.push(value.id);
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
    const [correctID, setCorrect] = useState(false);

    const onSearch = () => {
        setST(findId(id));
        if (findId(id) == "IDが存在します") {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    };
    const onJoin = () => {
        // 入室時処理
    };
    const onLeave = () => {
        // 退室時処理
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
                    <p>{searchedText}</p>
                </div>
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
                        {memberData.member.map((member) => {
                            return table(
                                member.name,
                                member.age,
                                member.id,
                                member.category,
                                member.isActive
                            );
                        })}
                    </tbody>
                </table>
            </span>
        </>
    );
}

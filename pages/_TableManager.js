import style from "../styles/utils.module.css";

export default function table(name, age, id, category, status) {
    function isActive(bool) {
        var str = "退席中";
        if (bool) {
            str = "活動中";
        }
        return str;
    }
    function isStyle(bool) {
        var path = style.notactive;
        if (bool) {
            path = style.active;
        }
        return path;
    }
    /*let htmls;
    for (let member of data) {
        let tmp = (
            <tr className={style.tdDesign}>
                <td>{member.name}</td>
                <td>{member.age}</td>
                <td>{member.id}</td>
                <td>{member.category}</td>
                <td className={style.active}>{isActive(member.isActive)}</td>
            </tr>
        );
        htmls += tmp;
    }*/
    return (
        <>
            <tr className={style.tdDesign}>
                <td>{name}</td>
                <td>{age}</td>
                <td>{id}</td>
                <td>{category}</td>
                <td className={isStyle(status)}>{isActive(status)}</td>
            </tr>
        </>
    );
}

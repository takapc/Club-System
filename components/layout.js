export default function User(props) {
    return (
        <>
            <h2>ユーザ</h2>
            <p>名前:{props.name}</p>
            <p>年齢:{props.age}</p>
        </>
    );
}

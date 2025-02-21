import styles from "../css/table.module.css";


export const ProfileTable = ({profileData}) => {

    return (
        <>
            <div className={styles.div}>
                <table className={styles.table}>
                    <tbody>
                    {profileData.map((row, index) => (
                        <TableRow key={index} label={row.label} value={row.value}>
                        </TableRow>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const TableRow = ({label, value}) =>{
    return(
        <tr className={styles.tr}>
            <td className={styles.td}>
                {label}
            </td>
            <td className={styles.td}>
                {value}
            </td>
        </tr>
    )
}




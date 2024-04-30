import 'boxicons'
import { Link } from "react-router-dom"
import style from "./Navbar.module.css"

function Navbar(){

    return(
        <div className={style.navbar}>
            <div className={style.icon}>
            <Link to= "/home" relative="path"><box-icon name='recycle' size='lg'></box-icon></Link>
            </div>
            <div className={style.menus}>
            <Link to="/list-points" relative="path"><a>Pontos de coleta</a></Link>
            <Link to="/create-points" relative="path"><a>Adicionar ponto</a></Link>
            </div>
        </div>
    )

}

export default Navbar
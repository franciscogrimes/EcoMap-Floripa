import 'boxicons'
import style from './footer.module.css'

function Footer (){
return(
<div>
    <div className= {style.container}> 
    <div >
        <p>Created by: Francisco Grimes</p>
    </div>
    <div className={style.links}>
        <a href="https://www.linkedin.com/in/francisco-grimes-bb773a260/"><box-icon name='linkedin-square' type='logo' color='#fefae0'></box-icon></a>
        <a href="https://github.com/franciscogrimes"><box-icon type='logo' name='github' color='#FEFAE0'></box-icon></a>
    </div>
    </div>
</div>

)
}

export default Footer
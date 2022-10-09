import { ActiveLink } from "./ActiveLink"
import styles from "./NavBar.module.css"

export const NavBar = () => {
  return (
    <nav className={ styles['menu-container'] }>
        <ActiveLink text="Predios" href="/"/>
        <ActiveLink text="Terrenos" href="/terrenos"/>
        <ActiveLink text="Propietarios" href="/propietarios"/>
        <ActiveLink text="Construcciones" href="/construcciones"/>
    </nav>
  )
}

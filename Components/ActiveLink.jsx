import Link from "next/link"
import { useRouter } from "next/router"

const style = {
    color: '#5721DD',
    textDecoration: 'underline',
}

export const ActiveLink = (props) => {

    const { asPath } = useRouter()

  return (
    <Link prefetch={false} href={props.href}>
     <a style={ asPath === props.href ? style : null }>{ props.text }</a>
    </Link>
  )
}

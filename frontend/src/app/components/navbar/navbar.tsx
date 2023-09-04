import Link from "next/link";
import ThemeSwitch from "../theme/themeswitch";

export default function NavBar() {
    return (
    <div className="navbar bg-base-300 rounded-lg">
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost normal-case text-xl">lumi</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>
              links
            </summary>
            <ul className="p-2 bg-base-200">
              <li><Link href="/movies">movies</Link></li>
              <li><Link href="/health">health</Link></li>
            </ul>
          </details>
        </li>
        <li><ThemeSwitch /></li>
      </ul>
    </div>
  </div>
  )
}
import Link from 'next/link';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* Eliminar el enlace "About" */}
        {/* Aquí puedes agregar otros enlaces si es necesario */}
      </ul>
    </nav>
  );
};

export default Menu;

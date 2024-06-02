import React from 'react'

const Menu: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Categorias</h1>
      </div>
      <ul>
        <li>
          Bongs
          <ul>
            <li>Subcategoria 1</li>
            <li>Subcategoria 2</li>
            <li>Subcategoria 3</li>
          </ul>
        </li>
        <li>
          Sedas
          <ul>
            <li>Subcategoria 1</li>
            <li>Subcategoria 2</li>
            <li>Subcategoria 3</li>
          </ul>
        </li>
        <li>
          Pipes
          <ul>
            <li>Subcategoria 1</li>
            <li>Subcategoria 2</li>
            <li>Subcategoria 3</li>
          </ul>
        </li>
        <li>
          Isqueiros
          <ul>
            <li>Subcategoria 1</li>
            <li>Subcategoria 2</li>
            <li>Subcategoria 3</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Menu

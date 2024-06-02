import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const MenuButton: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false)
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <button onClick={handleShowMenu}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  )
}

export default MenuButton

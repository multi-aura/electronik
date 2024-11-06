// AppSidebar.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilSettings } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={(visible) => dispatch({ type: 'set', sidebarShow: visible })}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon icon={cilSpeedometer} height={35} />
        <span className="ms-2">Admin Panel</span>
      </CSidebarBrand>
      <CSidebarNav>
        <CNavTitle>Dashboard</CNavTitle>
        <CNavItem>
          <NavLink to="/admin/dashboard" className="nav-link">
            <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
            Dashboard
          </NavLink>
        </CNavItem>
        <CNavTitle>Users</CNavTitle>
        <CNavItem>
          <NavLink to="/admin/users" className="nav-link">
            <CIcon icon={cilUser} customClassName="nav-icon" />
            User Management
          </NavLink>
        </CNavItem>
        <CNavTitle>Settings</CNavTitle>
        <CNavItem>
          <NavLink to="/admin/settings" className="nav-link">
            <CIcon icon={cilSettings} customClassName="nav-icon" />
            Settings
          </NavLink>
        </CNavItem>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !sidebarShow })}
      />
    </CSidebar>
  )
}

export default AppSidebar

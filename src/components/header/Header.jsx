import React, { useEffect, useState } from 'react'
import IconSearch from '../icons/IconSearch'
import { Link, useNavigate } from 'react-router-dom'
import { getUserFromLocalStorage } from '../../utils/userHandle'
import IconDropDown from '../icons/IconDropDown'
import { useDispatch } from 'react-redux'
import * as authAction from '../../redux/auth/authSlice'
import Categories from './components/Categories'
import { Avatar, Tooltip } from '@nextui-org/react'
import { getAllCategory } from '../../api/CategoryApi'
import IconCart from '../icons/IconCart'
import { Badge } from '@material-tailwind/react'

export default function Header() {

  let userCurrent = getUserFromLocalStorage()
  let navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function getData() {
      let Categories = await getAllCategory();
      setCategories(Categories.data)
    }
    getData()
  }, []);
 
  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  const handleDropDownMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [search, setSearch] = useState('')
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search)
  }

  const handleSearch = async () => {
    navigate(`/search?q=${search}`)
  }

  const handleLogout = () => {
    navigate('/')
    dispatch(authAction.logout())
  }
  return (
    <div >
      <div className='flex items-center justify-end pr-6 py-2'>
        <Link to='/' className='pr-2 hover:text-yellow-700 text-center'>👑 SneakerHead</Link>
        {userCurrent?.id !== undefined ? <>
          <div className="dropdown" >
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={handleDropDown} className="border-l-[1px] pl-2 border-gray-300 focus:outline-none text-center inline-flex items-center " type="button">Xin chào&nbsp;,&nbsp;<span className='font-semibold'>{userCurrent?.name}</span>
              <Avatar
                isBordered
                color="default"
                radius="full"
                src={userCurrent?.avatar}
                className='mx-2 h-[30px] w-[30px]'
              />
              <IconDropDown></IconDropDown>
            </button>

            <div
              id="dropdown"
              className={`z-10 w-44 bg-white rounded absolute shadow ml-9 ${isOpen ? "block" : "hidden"
                }`}
            >
              <ul className=" z-10 w-44 bg-white rounded shadow ">
                <li
                >
                  <Link to='order' onClick={handleDropDown} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">
                    Đơn hàng của tôi
                  </Link>
                </li>
                <li
                >
                  <Link to={`/profile/${userCurrent.id}`} onClick={handleDropDown} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">
                    Thông tin cá nhân
                  </Link>
                </li>
                <li
                >
                  <button type='button' onClick={handleLogout} className="block py-2 px-4 hover:bg-gray-100 w-full text-left">
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </> : <>
          <Link to='/login' className='border-l-[1px] border-gray-300 px-2 hover:text-yellow-700'>Đăng nhập</Link>
          <Link to='/register' className='border-l-[1px] border-gray-300 px-2 hover:text-yellow-700'>Đăng ký</Link>
        </>
        }
      </div>


      <nav
        className="flex items-center justify-between flex-wrap bg-white pt-2 pb-4 lg:px-12 shadow-lg border-solid ">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <img src={require('../../assets/ShoesLogo.png')} alt="ShoesLogo" style={{ width: '40px', height: '40px' }} />
            <span className="font-semibold text-xl tracking-tight">&nbsp;&nbsp;SNEAKERHEAD STORE</span>
          </div>
          <div className="block lg:hidden ">
            <div className='flex gap-4'>
              <button
                onClick={handleDropDownMenu}
                id="nav"
                className="flex items-center px-3 py-2 border-2 rounded text-yellow-700 border-yellow-700 hover:text-yellow-700 hover:border-yellow-700">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              <div className='mt-1'>
                <IconCart></IconCart>
              </div>
            </div>
          </div>
        </div>

        <div className={`menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 ${isMenuOpen ? "block" : "hidden"
          }`}>
          <div className="text-md font-bold  lg:flex-grow">
            <Link to='/'
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-yellow-700 mr-2">
              TRANG CHỦ
            </Link>
            <Tooltip
              content={<Categories categories={categories} />}
              css={{ left: '$0', transform: 'none' }}
              placement='bottom'
            >
              <p className="block cursor-default mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-yellow-700 mr-2">
                SẢN PHẨM
              </p>
            </Tooltip>
            <Link to='/'
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-yellow-700 mr-2">
              CHÍNH SÁCH
            </Link>
          </div>

          <div className="relative mx-auto text-gray-600 lg:block hidden">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
              type="search" name="search" placeholder="Search"
              value={search} onChange={handleSearchChange} />
            <button type="button" onClick={handleSearch} className="absolute right-0 top-0 mt-3 mr-2">
              
              <IconSearch></IconSearch>
              
            </button>
          </div>
          <Link to='/cart' className='ml-4 lg:block hidden'>
            <IconCart></IconCart>
          </Link>
        </div>
      </nav>
    </div>
  )
}

import {FC, useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image'
import Link from 'next/link'

// Redux & Actions
import { useAppDispatch, useAppSelector } from "@/utility/hooks"
import { handleLogout } from '@/src/redux/slices/user';
import {deleteHotel, handleStatus, IHotels} from '@/src/redux/slices/hotels';

//styles
import styles from './index.module.css'

//Components
import DataTableComponent from '@/src/components/DataTableComponent';
import CreateHotelModal from './createHotels'

//images
import HotelIcon from "@/src/assets/icons/hotel.svg"

//Third parties
import { Plus, 
  MoreVertical,
  Edit,
  Eye,
  EyeOff,
  Trash } from 'react-feather'

//types

//hooks
import usePortal from '@/utility/hooks/usePortal';


interface HotelsProos {}

const Hotels: FC<HotelsProos> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const store = useAppSelector(
    (state) => state?.hotels ?? {}
  ) as any

  const [hotelsData, setHotelsData] = useState<IHotels[]>([])
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [hotelToEdit, setHotelToEdit] = useState<IHotels>()

  useEffect(() => {
    const array = (store?.data || []).map((hotel: IHotels) => {
      return {
        id: hotel.id, 
        name: hotel.name, 
        subdomain: hotel.subdomain,
        stars: hotel.stars,
        email: hotel.email,
        phoneNumber: hotel.phoneNumber,
        address: `${hotel.streetName} - ${hotel.streetNumber}`,
        city: hotel.city,
        country: hotel.country,
        state: hotel.state
      }
    })

    setHotelsData(array)
  }, [store, store.data, dispatch])
  
  return (
    <div 
      className={`bg-no-repeat bg-right-bottom ${styles.imgHotel}`}>

        <div className='m-auto w-11/12 lg:w-9/12'>
          <header className='py-6 w-full text-center flex justify-between align-middle'>
            <Link href="/Home" className='flex items-center'>
              <Image 
                src={HotelIcon}
                alt="Hotel Icon"
                width={60}
                height={60}
              />
              <h1 className='text-purple-500 mx-4 text-2xl'>Travelers</h1>
            </Link>

            <div className='hidden md:flex items-center justify-between'>
              <Link href='/Home' className='font-bold text-lg hover:underline'>Home</Link>
              <Link href='/Home' className='text-lg ml-9 hover:underline'>Support</Link>
              <Link href='/Home' className='text-lg ml-9 hover:underline'>About as</Link>
            </div>

            <div className='flex items-center'>
              <button 
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/')
                  dispatch(handleLogout())
                }}  
              >
                  log out
              </button>
            </div>
          </header>

          <section className='mt-20'>
            <p className='text-5xl font-bold'>The easiest way to</p>  
            <p className='text-5xl font-bold my-4'>manage your accommodations</p>

            <button 
              className="bg-purple-500 hover:bg-purple-700 text-white text-2xl font-bold py-2 px-4 my-4 rounded inline-flex items-center"
              onClick={() => {
                setShowModal(true)
                setHasValue(false)
              }}
              >
              <Plus />
              <span className='ml-4'>New hotel</span>
            </button>   
          </section>

          <section className='my-4'>
            <DataTableComponent
              title='Hotels'
              columns={[
                { title: 'Id', field: 'id', width: "auto"  },
                { title: 'Name', field: 'name', width: "auto"  },
                { title: 'Subdomain', field: 'subdomain', width: "auto"  },
                { title: 'Stars', field: 'stars', type: 'numeric', width: "auto" },
                { title: 'Email', field: 'email', width: "auto" },
                { title: 'Phone number', field: 'phoneNumber', width: "auto"},
                { title: 'Address', field: 'address', width: "auto" },
                { title: 'City', field: 'city', width: "auto" },
                { title: 'Country', field: 'country', width: "auto",},
              ]}
              data={hotelsData}
              clickAction={router}
              actions={[
                (rowData: any) => ({
                    icon: rowData.state ? () => <EyeOff /> : () => <Eye />,
                    tooltip: rowData.state ? "Inactive" : "Active",
                    onClick: (event: any, rowData: any) => {
                      let selectedHotel: IHotels = (store.data || []).find((hotel: IHotels) => {
                        return hotel.id === Number(rowData.id)
                      })
                      let newHotel = {...selectedHotel}
                      newHotel.state = selectedHotel.state ? 0 : 1
                      dispatch(handleStatus(newHotel))
                    },
                  }),
                {
                  icon: () => <Edit />,
                  tooltip: 'Edit',
                  onClick: (event: any, rowData: any) => {
                    setHasValue(true)
                    setHotelToEdit(store.data.find((hotel: IHotels) => hotel.id === Number(rowData.id)))
                    setShowModal(true)
                  }
                }
              ]}
            />
          </section>

        </div>

        <CreateHotelModal  setShowModal={setShowModal} showModal={showModal} value={hasValue ? hotelToEdit : null}/>

      </div>
  )
}

export default Hotels
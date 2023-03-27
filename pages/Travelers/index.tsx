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

//images
import HotelIcon from "@/src/assets/icons/hotel.svg"
import RoomEmptyState from "@/src/assets/images/room.jpeg"

//Third parties
import { Plus, 
  MoreVertical,
  Edit,
  Eye,
  EyeOff,
  Percent,
  Trash, 
  RefreshCcw,
  X} from 'react-feather'
  import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';


import rooms, {editRoom, addNewRoom, IRooms} from '@/src/redux/slices/rooms';
import {IroomsType} from '@/src/redux/slices/roomTypes';
import {IBookings} from '@/src/redux/slices/bookings';
import CreateBookingModal from './createBooking';
import Empty from '@/src/components/empty';

//types

interface TravelersProos {}

const Travelers: FC<TravelersProos> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [cities, setCities] = useState<string[]>([])
  const [allRooms, setAllRooms] = useState<IRooms[]>([])
  const [roomsToShow, setRoomsToShow] = useState<IRooms[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [roomsID, setRoomsID] = useState<number | null>(null)
  const [dates, setDates] = useState<any>(null)

  const store = useAppSelector(
    (state) => state?.hotels ?? {}
  ) as any

  const bookings = useAppSelector(
    (state) => state?.bookings?.data ?? {}
  ) as any

  const rooms = useAppSelector(
    (state) => state?.rooms?.data ?? {}
  ) as any

  const roomTypes = useAppSelector(
    (state) => state?.roomTypes?.data ?? {}
  ) as any

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    city: Yup.string(),
    checkin: Yup.string().required('Required'),
    checkout: Yup.string().required('Required'),
    guests: Yup.number().min(1).required('Required'),
  });

  useEffect(() => {
    const citiesArr: string[] = []

    store.data.map((hotel: IHotels) => {
      if (!citiesArr.includes(hotel.city)) {
        citiesArr.push(hotel.city)
      }
    })

    setCities(citiesArr)
  }, [store])

  useEffect(() => {
    setAllRooms(rooms)
    setRoomsToShow(rooms)
  }, [rooms])

  const filterRooms = (filters: any) => {
    let finalRooms:any[] = [...allRooms]
    if (filters.city) {
      const citiesHotels = store.data.filter((hotel:IHotels) => {
        return hotel.city === filters.city
      })
      .map((currentHote:IHotels) => {return currentHote.id})
      
      
      finalRooms = (finalRooms || []).map((room:IRooms) => {
        if (citiesHotels.includes(room?.hotelId)) return room
      }).filter((x:any) => x !== undefined)
      
    }
    if (filters.guests) {
      finalRooms = finalRooms?.filter((currentRooms:IRooms) => {
        return roomTypes?.find((type: IroomsType) => type?.id === currentRooms.hotelId)?.guests >= filters.guests
      })  
    }

    setRoomsToShow(finalRooms)
  }
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

          <section>
            <Formik
                  initialValues={{
                    city: "",
                    checkin: "",
                    checkout: "",
                    guests: 0
                  }}
                  validationSchema={DisplayingErrorMessagesSchemaNormal}
                  onSubmit={values => {
                    const toFilters = {...values, city: values.city === "WorlWide" ? undefined : values.city}
                    setDates({checkin: values.checkin, checkout: values.checkout})
                    filterRooms(toFilters)
                  }}
                >
                {({ errors, touched, values }) => (
                  <Form className="">
                    <div className="flex justify-center gap-4 items-center">
                      <div>
                        <Field
                          className={styles.inputContainer} 
                          as="select"
                          placeholder="City" 
                          name="city"
                        >
                          <option value={undefined}>WorlWide</option>
                          {cities.map((city: string, index:number) => {
                              return (
                                <option key={index} value={city}>{city}</option>
                              )
                          })}
                        </Field>
                        {errors.city && touched.city && <p className='text-red-500'>{errors.city}</p>}
                      </div>
                      <div>
                        <Field
                          className={styles.inputContainer} 
                          type="date" 
                          placeholder="Check-in" 
                          name="checkin"
                          min={new Date().toJSON().slice(0,10)}
                        />
                        {errors.checkin && touched.checkin && <p className='text-red-500'>{errors.checkin}</p>}
                      </div>

                      <div>
                        <Field
                          className={styles.inputContainer} 
                          type="date" 
                          placeholder="Check-out" 
                          name="checkout"
                          min={values.checkin ? values.checkin : new Date().toJSON().slice(0,10)}
                        />
                        {errors.checkout && touched.checkout && <p className='text-red-500'>{errors.checkout}</p>}
                      </div>

                      <div>
                        <Field
                          className={styles.inputContainer} 
                          type="number" 
                          placeholder="Travelers" 
                          name="guests"
                          min={0}
                        />
                        {errors.guests && touched.guests && <p className='text-red-500'>{errors.guests}</p>}
                      </div>

                      <button
                        id="submitButton"
                        className="bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Search
                      </button>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
                </Form>
                )}
                </Formik>
          </section>

          <section className='m-4'>
          <p className="font-bold text-2xl">What Travelers brings to the table.</p>
            <div className="my-8 flex flex-wrap align-center">
              <div className="max-w-sm rounded border-solid bg-white p-4 border-2 overflow-hidden shadow-lg">
                <div className={`bg-indigo-100 rounded flex items-center justify-center ${styles.badge}`}><Percent/></div>
                <p className="font-bold my-2">Big names, great deals</p>
                <p>Search 100s of travel sites to compare prices</p>
              </div>

              <div className="max-w-sm rounded border-solid bg-white p-4 ml-8 border-2 overflow-hidden shadow-lg">
                <div className={`bg-indigo-100 rounded flex items-center justify-center ${styles.badge}`}><RefreshCcw/></div>
                <p className="font-bold my-2">Book with flexibility</p>
                <p>Use our “no change fees” filter for flights that waive fees</p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <p className="text-2xl font-bold">Available rooms</p>
            {roomsToShow.length > 0 ? (
              <div>
                {roomsToShow.map((room: IRooms, index:number) => {
                  const hotelState = store.data.find((hotel: IHotels) => hotel.id === room.hotelId)?.state
                  if (room.state && hotelState) {
                    return (
                      <div key={index} className={`${styles.card} max-w-sm my-8 rounded w-auto border-solid bg-white p-4 border-2 shadow-lg`}>
                        <div className={`flex ${styles.card}`}>
                          <Image 
                            src={RoomEmptyState}
                            alt={`Room image ${index}`}
                            width={250}
                            height={250}
                          />
                          <div className="mx-8">
                            <p className="font-bold text-2xl text-purple-500">{room.name}</p>
                            <div className="my-4 flex items-between">
                              <p className="font-bold">Price:</p>
                              <p className="ml-2">${roomTypes.find((type: IroomsType) => type.id === room.roomTypeID)?.price}</p>
                            </div>
                            <button
                              id="book"
                              className="bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              onClick={() => {
                                setOpenModal(true)
                                setRoomsID(room.id)
                              }}
                              
                            >
                              Book now
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              }
              </div>
                         
            ) : (<Empty />)}
          </section>
          
          
        </div>
      <CreateBookingModal showModal={openModal} setShowModal={setOpenModal} roomId={roomsID} dates={dates}/>
      </div>
  )
}

export default Travelers
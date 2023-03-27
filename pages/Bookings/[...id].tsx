import {FC, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Layout from '@/src/components/Layaout/Layaut'

//styles
import styles from "./index.module.css"

//Third parties
import { Plus, Edit, Eye, ArrowRightCircle } from 'react-feather'

//hooks
import {useAppSelector} from '@/utility/hooks'

//Components
import Empty from '@/src/components/empty'
import DataTableComponent from '@/src/components/DataTableComponent'
import CreateBookingModal from './createBooking'

//types
import {IroomsType} from '@/src/redux/slices/roomTypes'
import {IRooms} from '@/src/redux/slices/rooms'

import {IBookings} from '@/src/redux/slices/bookings'

interface BookingDetailProos {}

const BookingDetail: FC<BookingDetailProos> = ({}) => {
  const router = useRouter()
  const { id } = router.query

  const [bookingsData, setBookingsData] = useState<IBookings[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [bookingToEdit, setBookingsToEdit] = useState<IBookings>()

  const roomTypes = useAppSelector(
    (state) => state?.roomTypes ?? {}
  ) as any

  const rooms = useAppSelector(
    (state) => state?.rooms ?? {}
  ) as any

  const bookings = useAppSelector(
    (state) => state?.bookings ?? {}
  ) as any

   useEffect(() => {
    const array = (bookings?.data || []).map((booking: IBookings) => {
      const bookingRoom = rooms.data.find((room:IRooms) => Number(booking.room) === Number(room.id))
      if (Number(bookingRoom.hotelId) === Number(id)) {
        return {
          id: booking.id,
          name: booking.name,
          lastName: booking.lastName,
          sex: booking.sex ? "Female" : "Male",
          email: booking.email,
          phoneNumber: booking.phoneNumber,
          room: bookingRoom?.name,
          birthDate: booking.birthDate,
          document: booking.document,
          checkin: booking.checkin,
          checkout: booking.checkout,
          emergencyName: booking.emergencyName,
          emergencyPhone: booking.emergencyPhone,
        }
      }
    }).filter((x:any) => x !== undefined)

    setBookingsData(array)
  }, [bookings, bookings.data])

  return (
    <Layout title={"Bookings"}>
      <div className="w-full mt-4 md:px-8 h-full">
       <div className={`w-full h-full rounded-2xl shadow-lg ${styles.roomsContainer}`}>
         <div className="w-full flex justify-end p-8">
           <button 
                className={`${styles.rightButton} flex`}
                onClick={() => {
                  setHasValue(false)
                  setOpenModal(true)
                }}
                >
                <Plus className="mr-4"/> New booking
            </button>
         </div>
         <div className="px-8">
          {bookings.data.length === 0 ?
              (
                <Empty/>
              ) : (
                <div className="w-full">
                  <DataTableComponent
                    title='Bookings'
                    columns={[
                      {title: 'Id', field: 'id', type: 'numeric', width: "auto"},
                      {title: 'Name', field: 'name', width: "auto"},
                      {title: 'Last name', field: 'lastName', width: "auto"},
                      {title: 'Email', field: 'email', width: "auto"},
                      {title: 'PhoneNumber', field: 'phoneNumber', width: "auto"},
                      {title: 'Room', field: 'room', width: "auto"},
                      {title: 'checkin', field: 'checkin', width: "auto"},
                      {title: 'checkout', field: 'checkout', width: "auto"},
                    ]}
                    data={bookingsData}
                    clickAction={() => {}} 
                    actions={[
                      {
                        icon: () => <ArrowRightCircle />,
                        tooltip: 'View',
                        onClick: (event: any, rowData: any) => {
                          setHasValue(true)
                          setBookingsToEdit(bookings.data.find((booking: IBookings) => booking.id === Number(rowData.id)))
                          setOpenModal(true)
                        }
                      }
                    ]}                    
                  />
                </div> 
              )
            }
         </div>
       </div>
      </div>
      <CreateBookingModal showModal={openModal} setShowModal={setOpenModal} value={hasValue ? bookingToEdit : null}/>
    </Layout>
  )
}

export default BookingDetail

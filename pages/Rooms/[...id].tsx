import {FC, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Layout from '@/src/components/Layaout/Layaut'

//styles
import styles from "./index.module.css"

//Third parties
import { Plus, Edit, EyeOff, Eye } from 'react-feather'

//hooks
import {useAppDispatch, useAppSelector} from '@/utility/hooks'

//Components
import Empty from '@/src/components/empty'
import DataTableComponent from '@/src/components/DataTableComponent'
import CreateRoomTypesModal from './createRoomTypes'
import CreateRoomModal from './createRooms'

//types
import {IroomsType} from '@/src/redux/slices/roomTypes'
import {IRooms, handleStatus} from '@/src/redux/slices/rooms'

interface RoomDeatilProos {}

const RoomDeatil: FC<RoomDeatilProos> = ({}) => {
  const dispatch = useAppDispatch()
  
  const router = useRouter()
  const { id } = router.query

  const roomTypes = useAppSelector(
    (state) => state?.roomTypes ?? {}
  ) as any

  const rooms = useAppSelector(
    (state) => state?.rooms ?? {}
  ) as any

  const [isRoomTypes, setIsRoomTypes] = useState<boolean>(false)
  const [roomTypesData, setIsRoomTypesData] = useState<IroomsType[]>([])
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasRoomType, setHasRoomType] = useState<boolean>(false);
  const [roomTypeToEdit, setRoomTypeToEdit] = useState<IroomsType>()

  const [showRoomsModal, setShowRoomsModal] = useState<boolean>(false);
  const [hasRoom, setHasRoom] = useState<boolean>(false);
  const [roomsData, setRoomsData] = useState<IRooms[]>([])
  const [roomToEdit, setRoomToEdit] = useState<IRooms>()

  useEffect(() => {
    const array = (roomTypes?.data || []).map((hotel: IroomsType) => {
      if (Number(hotel.hotelId) === Number(id)) {
        return {
          id: hotel.id, 
          name: hotel.name, 
          price: Number(hotel.price),
          tax: Number(hotel.tax),
          guests: Number(hotel.guests)
        }
      }
    }).filter((x:any) => x !== undefined)

    setIsRoomTypesData(array)
  }, [roomTypes, roomTypes.data])

   useEffect(() => {
    const array: IRooms[] = (rooms?.data || []).map((room: IRooms) => {
      if (Number(room.hotelId) === Number(id)) {
      return {
        id: room.id, 
        name: room.name, 
        type: roomTypes.data.find((x:IroomsType) => x.id === room.roomTypeID)?.name,
        state: room.state
      }
    }
    }).filter((x:any) => x !== undefined)

    setRoomsData(array)
  }, [rooms, rooms?.data, roomTypes])

  return (
    <Layout title={isRoomTypes ? "Room types" : "Rooms"}>
      <div className="w-full mt-4 md:px-8 h-full">
       <div className={`w-full h-full rounded-2xl shadow-lg ${styles.roomsContainer}`}>
          <div className="w-full flex justify-end p-8">
            <div className="flex">
              <button 
                className={`${styles.rightButton} ${!isRoomTypes ? styles.ButtonActive : ""}`}
                onClick={() => setIsRoomTypes(false)}
                >
                Rooms
              </button>
              <button 
                className={`${styles.leftButton} ${isRoomTypes ? styles.ButtonActive : ""}`}
                onClick={() => setIsRoomTypes(true)}
                >
                Room types
              </button>
              <button 
                className={`bg-purple-500 hover:bg-purple-900 ml-4 rounded-ful shadow-lg ${styles.addRoomButton}`}
                onClick={() => {
                  if (isRoomTypes) {
                    setHasRoomType(false)
                    setShowModal(true)
                  } else {
                    setHasRoom(false)
                    setShowRoomsModal(true)
                  }
                }}
                >
                <Plus color='white'/>
              </button>
            </div>
          </div>

          <div className='px-8'>
            {!isRoomTypes ? (
              <div>
                {roomsData.length === 0 ?
                  (
                    <Empty/>
                  ) : (
                    <DataTableComponent
                      title='Rooms'
                      columns={[
                        {title: 'Id', field: 'id', width: "auto"},
                        {title: 'Name', field: 'name', width: "auto"},
                        {title: 'Type', field: 'type', width: "auto"},
                      ]}
                      data={roomsData}
                      clickAction={() => {}} 
                      actions={[
                        (rowData: any) => ({
                          icon: rowData.state ? () => <EyeOff /> : () => <Eye />,
                          tooltip: rowData.state ? "Inactive" : "Active",
                          onClick: (event: any, rowData: any) => {
                            let selectedRoom: IRooms = (rooms.data || []).find((hotel: IRooms) => {
                              return hotel.id === Number(rowData.id)
                            })
                            let newHotel = {...selectedRoom}
                            newHotel.state = selectedRoom.state ? 0 : 1
                            dispatch(handleStatus(newHotel))
                          },
                        }),
                        {
                          icon: () => <Edit />,
                          tooltip: 'Edit',
                          onClick: (event: any, rowData: any) => {
                            setHasRoom(true)
                            setRoomToEdit(rooms.data.find((hotel: IRooms) => hotel.id === Number(rowData.id)))
                            setShowRoomsModal(true)
                          }
                        }
                      ]}                    
                      />
                  )
                }
              </div>
            ) : (
              <div>
                {roomTypesData.length === 0 ?
                  (
                    <Empty/>
                  ) : (
                    <DataTableComponent
                      title='Room types'
                      columns={[
                        {title: 'Id', field: 'id', width: "auto"},
                        {title: 'Name', field: 'name', width: "auto"},
                        {title: 'Price', field: 'price', type: "numeric", width: "auto"},
                        {title: 'Tax %', field: 'tax', type: 'numeric', width: "auto"},
                        {title: 'Max, no guests', field: 'guests', type: 'numeric', width: "auto"},
                      ]}
                      data={roomTypesData}
                      clickAction={() => {}} 
                      actions={[
                        {
                          icon: () => <Edit />,
                          tooltip: 'Edit',
                          onClick: (event: any, rowData: any) => {
                            setHasRoomType(true)
                            setRoomTypeToEdit(roomTypes.data.find((hotel: IroomsType) => hotel.id === Number(rowData.id)))
                            setShowModal(true)
                          }
                        }
                      ]}                 
                      />
                  )
                }
              </div>
            )}
          </div>
       </div>
      </div>
      <CreateRoomTypesModal showModal={showModal} setShowModal={setShowModal} value={hasRoomType ? roomTypeToEdit : null}/>
      <CreateRoomModal showModal={showRoomsModal} setShowModal={setShowRoomsModal} value={hasRoom ? roomToEdit : null}/>
    </Layout>
  )
}

export default RoomDeatil

import {FC, RefObject, useEffect, useRef, useState} from "react"

// Redux & Actions
import { useAppDispatch, useAppSelector } from "@/utility/hooks"

//Third parties
import { X } from 'react-feather'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useOnClickOutside } from "usehooks-ts";
import moment from "moment"

//styles
import styles from  '@/styles/login.module.css'
import {addNewHotel, editHotel, IHotels} from "@/src/redux/slices/hotels";
import {addBooking, IBookings} from "@/src/redux/slices/bookings";
import {IRooms} from "@/src/redux/slices/rooms";
import {useRouter} from "next/router";
import {IroomsType} from "@/src/redux/slices/roomTypes";

interface CreateBookingModalProps {
  showModal: boolean,
  setShowModal: any,
  value?: IBookings | null
}

const CreateBookingModal: FC<CreateBookingModalProps> = ({ showModal, setShowModal, value }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setShowModal(false);
  });
  
  const dispatch = useAppDispatch()
  
  const router = useRouter()
  const { id } = router.query


  const store = useAppSelector(
    (state) => state?.bookings ?? {}
  ) as any

  const rooms = useAppSelector(
    (state) => state?.rooms ?? {}
  ) as any

  const roomsType = useAppSelector(
    (state) => state?.roomTypes?.data ?? {}
  ) as any

  const [totalPrice, setTotalPrice] = useState<number>(0)

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    name: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
    lastName: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
    sex: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().min(2, 'Too Short!').required('Required'),
    room: Yup.string().required('Required'), 
    birthDate: Yup.string().required('Required'),
    document: Yup.string().min(2, 'Too Short!').required('Required'),
    checkin: Yup.string().required('Required'),
    checkout: Yup.string().required('Required'),
    emergencyName: Yup.string().min(2, 'Too Short!').required('Required'),
    emergencyPhone: Yup.string().min(2, 'Too Short!').required('Required'),
  });

  useEffect(() => {
    if (value) {
      const price = roomsType.find((type: IroomsType) => type.id === rooms.data.find((room: IRooms) => room.id === value?.room)?.roomTypeID)?.price
      const tax = roomsType.find((type: IroomsType) => type.id === rooms.data.find((room: IRooms) => room.id === value?.room)?.roomTypeID)?.tax
      const totalDays = moment(value?.checkout).diff(moment(value?.checkin), 'days')
      setTotalPrice((price * totalDays) *  (1 + (tax / 100)))
    }
  }, [value])

  return (
    <>
      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full md:w-4/5 lg:w-3/5 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div ref={ref} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Booking
                  </h3>
                  <X className="cursor-pointer" onClick={() => setShowModal(false)}/>
                </div>
                {/*body*/}
                <Formik
                  initialValues={{
                    id: value?.id || store.data.length,
                    name: value?.name || "" ,
                    lastName: value?.lastName || "",
                    sex: value?.sex !== undefined ? value?.sex : undefined,
                    email: value?.email || "",
                    phoneNumber: value?.phoneNumber || "",
                    room: value?.room !== undefined ? value?.room : undefined,
                    birthDate: value?.birthDate || "",
                    document: value?.document || "",
                    checkin: value?.checkin || "",
                    checkout: value?.checkout || "",
                    emergencyName: value?.emergencyName || "",
                    emergencyPhone: value?.emergencyPhone || "",
                  }}
                  validationSchema={DisplayingErrorMessagesSchemaNormal}
                  onSubmit={values => {
                    const valuesFormat = {...values, sex: Number(values.sex), room: Number(values.room)}
                    dispatch(addBooking(valuesFormat))
                    setShowModal(false)
                  }}
                >
                {({ errors, touched, values}) => (
                  <Form>
                    <div className="grid px-5 pt-5 grid-cols-2 gap-4">
                      {value &&
                        <div className="flex items-center">
                          <p className="text-2xl font-semibold">Room:</p>
                          <p className="text-2xl ml-2 font-light">{rooms.data.find((room: IRooms) => room.id === Number(values.room))?.name}</p>
                        </div>
                      }
                      {value &&
                        <div className="flex items-center">
                          <p className="text-2xl font-semibold">Price:</p>
                          <p className="text-2xl ml-2 font-light">{`$${totalPrice}`}</p>
                        </div>
                      }
                      <div>
                        <label htmlFor="checkin"><small>Check-in date*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="date" 
                          placeholder="" 
                          name="checkin"
                          min={new Date().toJSON().slice(0,10)}
                        />
                        {errors.checkin && touched.checkin && <p className='text-red-500'>{errors.checkin}</p>}
                      </div>

                      <div>
                        <label htmlFor="checkout"><small>Check-out date*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="date" 
                          placeholder="" 
                          name="checkout"
                          min={values.checkin ? values.checkin : new Date().toJSON().slice(0,10)}
                        />
                        {errors.checkout && touched.checkout && <p className='text-red-500'>{errors.checkout}</p>}
                      </div>

                      <div>
                        <label htmlFor="name"><small>Hotel name*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Hotel name" 
                          name="name"
                        />
                        {errors.name && touched.name && <p className='text-red-500'>{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName"><small>LastName*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="https//..." 
                          name="lastName"
                        />
                        {errors.lastName && touched.lastName && <p className='text-red-500'>{errors.lastName}</p>}
                      </div>

                      <div>
                        <label htmlFor="sex"><small>Genre*</small></label>
                         <Field
                          disabled={Boolean(value)} className={styles.inputModalContainer}  name="sex" as="select">
                            <option value={undefined}>Select</option>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                          </Field>
                        {errors.sex && touched.sex && <p className='text-red-500'>{errors.sex}</p>}
                      </div>

                      <div>
                        <label htmlFor="email"><small>Email*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="email@gmail.com" 
                          name="email"
                        />
                        {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phoneNumber"><small>Phone number*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="+57 30213122" 
                          name="phoneNumber"
                        />
                        {errors.phoneNumber && touched.phoneNumber && <p className='text-red-500'>{errors.phoneNumber}</p>}
                      </div>

                      {!value &&
                        <div>
                          <label htmlFor="rooom"><small>Room*</small></label>
                          <Field
                            disabled={Boolean(value)}
                            className={styles.inputModalContainer} 
                            as="select"
                            placeholder="Hotel name" 
                            name="room"
                          >
                            <option value={undefined}>Select</option>
                            {rooms.data.map((room: IRooms, index:number) => {
                              const numberToValue = Number(room.id)
                              const isalreadyBooked = store?.data?.some((book:IBookings) => book.checkin === values.checkin && book.room === numberToValue)
                              if (room.state && Number(room.hotelId) === Number(id) && !isalreadyBooked) {
                                return (
                                  <option key={index} value={room.id}>{room.name}</option>
                                )
                              }
                            })}
                          </Field>
                          {errors.room && touched.room && <p className='text-red-500'>{errors.room}</p>}
                        </div>
                      }

                      <div>
                        <label htmlFor="birthDate"><small>birth Date*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="date" 
                          placeholder="" 
                          name="birthDate"
                          max={new Date().toJSON().slice(0,10)}
                        />
                        {errors.birthDate && touched.birthDate && <p className='text-red-500'>{errors.birthDate}</p>}
                      </div>

                      <div>
                        <label htmlFor="document"><small>Documet*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="1023213" 
                          name="document"
                        />
                        {errors.document && touched.document && <p className='text-red-500'>{errors.document}</p>}
                      </div>

                      <div>
                        <label htmlFor="emergencyName"><small>Emergency name*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Andres perez" 
                          name="emergencyName"
                        />
                        {errors.emergencyName && touched.emergencyName && <p className='text-red-500'>{errors.emergencyName}</p>}
                      </div>

                      <div>
                        <label htmlFor="emergencyPhone"><small>Emergency phone*</small></label>
                        <Field
                          disabled={Boolean(value)}
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="+57 3023123" 
                          name="emergencyPhone"
                        />
                        {errors.emergencyPhone && touched.emergencyPhone && <p className='text-red-500'>{errors.emergencyPhone}</p>}
                      </div>
                    
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        {value ? "Edit" : "Add"}
                      </button>
                    </div>
                  </Form>
                )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  )
}

export default CreateBookingModal

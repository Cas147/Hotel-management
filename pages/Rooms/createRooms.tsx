import {FC, useRef} from "react"
import {useRouter} from "next/router";

// Redux & Actions
import { useAppDispatch, useAppSelector } from "@/utility/hooks"

//Third parties
import { X } from 'react-feather'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useOnClickOutside } from "usehooks-ts";

//styles
import styles from  '@/styles/login.module.css'

//redux
import { addNewRoom, editRoom } from "@/src/redux/slices/rooms";
import {IRooms} from "@/src/redux/slices/rooms";
import {IroomsType} from "@/src/redux/slices/roomTypes";

interface CreateRoomModalProps {
  showModal: boolean,
  setShowModal: any,
  value?: IRooms | null
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({ showModal, setShowModal, value }) => {
  const router = useRouter()
  const { id } = router.query
  
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setShowModal(false);
  });
  
  const dispatch = useAppDispatch()
  
  const store = useAppSelector(
    (state) => state?.roomTypes ?? {}
  ) as any

  const rooms = useAppSelector(
    (state) => state?.rooms ?? {}
  ) as any

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    name: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
    roomTypeID: Yup.number().required('Required'),
  });

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
                    Add room type
                  </h3>
                  <X className="cursor-pointer" onClick={() => setShowModal(false)}/>
                </div>
                {/*body*/}
                <Formik
                  initialValues={{
                    id: value?.id !== undefined ? value.id : rooms.data.length,
                    name: value?.name || "",
                    roomTypeID: value?.roomTypeID || "",
                    state: value?.state || 1,
                    hotelId: id
                  }}
                  validationSchema={DisplayingErrorMessagesSchemaNormal}
                  onSubmit={values => {
                    const newRoom = {...values, roomTypeID: Number(values.roomTypeID)}
                    if (value) {
                      dispatch(editRoom(newRoom))
                      setShowModal(false)
                    } else {
                      dispatch(addNewRoom(newRoom))
                      setShowModal(false)
                    }
                  }}
                >
                {({ errors, touched }) => (
                  <Form>
                    <div className="grid px-5 pt-5 grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name"><small>Hotel name*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Hotel name" 
                          name="name"
                        />
                        {errors.name && touched.name && <p className='text-red-500'>{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="roomTypeID"><small>Room type*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          as="select"
                          placeholder="Hotel name" 
                          name="roomTypeID"
                        >
                          {store.data.map((roomType: IroomsType, index:number) => {
                            if (Number(roomType.hotelId) === Number(id)) {
                              return (
                                <option key={index} value={roomType.id}>{roomType.name}</option>
                              )
                            }
                          })}
                        </Field>
                        {errors.roomTypeID && touched.roomTypeID && <p className='text-red-500'>{errors.roomTypeID}</p>}
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
                        id="submitButton"
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

export default CreateRoomModal

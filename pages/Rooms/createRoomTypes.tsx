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
import {addNewRoomType, editRoomType, IroomsType} from "@/src/redux/slices/roomTypes";

interface CreateRoomTypesModalProps {
  showModal: boolean,
  setShowModal: any,
  value?: IroomsType | null
}

const CreateRoomTypesModal: FC<CreateRoomTypesModalProps> = ({ showModal, setShowModal, value }) => {
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

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    name: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
    price: Yup.number().min(0).required('Required'),
    tax: Yup.number().min(0).max(100).required('Required'),
    guests: Yup.number().min(0).required('Required'),
    image: Yup.string()
      .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!'
    ),
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
                    id: value?.id !== undefined ? value.id : store.data.length,
                    name: value?.name || "",
                    price: value?.price || 0,
                    tax: value?.tax || 0,
                    guests: value?.guests || 0,
                    hotelId: id || 0,
                    image: value?.image ||  "",
                  }}
                  validationSchema={DisplayingErrorMessagesSchemaNormal}
                  onSubmit={values => {
                    if (value) {
                      dispatch(editRoomType(values))
                      setShowModal(false)
                    } else {
                      dispatch(addNewRoomType(values))
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
                        <label htmlFor="price"><small>Price*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="number" 
                          placeholder="100" 
                          name="price"
                        />
                        {errors.price && touched.price && <p className='text-red-500'>{errors.price}</p>}
                      </div>

                      <div>
                        <label htmlFor="tax"><small>Tax %*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="number" 
                          placeholder="1522" 
                          name="tax"
                        />
                        {errors.tax && touched.tax && <p className='text-red-500'>{errors.tax}</p>}
                      </div>
                      <div>
                        <label htmlFor="guest"><small>Guest*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="number" 
                          placeholder="2"
                          name="guests"
                        />
                        {errors.guests && touched.guests && <p className='text-red-500'>{errors.guests}</p>}
                      </div>
                    </div>
                    <div className="p-5">
                      <label htmlFor="image"><small>image</small></label>
                      <Field
                        className={styles.inputModalContainer} 
                        type="text" 
                        placeholder="https//image.com" 
                        name="image"
                      />
                      {errors.image && touched.image && <p className='text-red-500'>{errors.image}</p>}
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

export default CreateRoomTypesModal

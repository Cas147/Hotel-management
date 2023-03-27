import {FC, RefObject, useRef} from "react"

// Redux & Actions
import { useAppDispatch, useAppSelector } from "@/utility/hooks"

//Third parties
import { X } from 'react-feather'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useOnClickOutside } from "usehooks-ts";

//styles
import styles from  '@/styles/login.module.css'
import {addNewHotel, editHotel, IHotels} from "@/src/redux/slices/hotels";

interface CreateHotelModalProps {
  showModal: boolean,
  setShowModal: any,
  value?: IHotels | null
}

const CreateHotelModal: FC<CreateHotelModalProps> = ({ showModal, setShowModal, value }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setShowModal(false);
  });
  
  const dispatch = useAppDispatch()
  
  const store = useAppSelector(
    (state) => state?.hotels ?? {}
  ) as any

  const DisplayingErrorMessagesSchemaNormal = Yup.object().shape({
    name: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
    subdomain: Yup.string()
      .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
      ),
    stars: Yup.number().min(0).max(5),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().min(2, 'Too Short!').required('Required'),
    streetName: Yup.string().min(2, 'Too Short!').required('Required'),
    streetNumber: Yup.string().min(2, 'Too Short!').required('Required'),
    zipCode: Yup.string().min(2, 'Too Short!').required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
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
                    Add Hotel
                  </h3>
                  <X className="cursor-pointer" onClick={() => setShowModal(false)}/>
                </div>
                {/*body*/}
                <Formik
                  initialValues={{
                    id: value?.id !== undefined ? value.id : store.data.length,
                    name: value?.name || "",
                    subdomain: value?.subdomain || "",
                    stars: value?.stars || 0,
                    email: value?.email || "",
                    phoneNumber: value?.phoneNumber ||  "",
                    streetName: value?.streetName ||  "",
                    streetNumber: value?.streetNumber ||  "",
                    zipCode: value?.zipCode ||  "",
                    city: value?.city || "",
                    country: value?.country || "",
                    state: value?.state || 1,
                    image: value?.image ||  ""
                  }}
                  validationSchema={DisplayingErrorMessagesSchemaNormal}
                  onSubmit={values => {
                    if (value) {
                      dispatch(editHotel(values))
                      setShowModal(false)
                    } else {
                      dispatch(addNewHotel(values))
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
                        <label htmlFor="subdomain"><small>Subdomain</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="https//..." 
                          name="subdomain"
                        />
                        {errors.subdomain && touched.subdomain && <p className='text-red-500'>{errors.subdomain}</p>}
                      </div>

                      <div>
                        <label htmlFor="stars"><small>Stars</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="number" 
                          placeholder="5" 
                          name="stars"
                          max="5"
                          min="0"
                        />
                        {errors.stars && touched.stars && <p className='text-red-500'>{errors.stars}</p>}
                      </div>
                    
                    </div>

                    <p className='font-bold text-md px-5 pt-5'>General</p>
                    <div className="grid p-5 grid-cols-2 gap-3">

                      <div>
                        <label htmlFor="email"><small>Email*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="email" 
                          placeholder="jhondoe@gmail.com"
                          name="email"
                        />
                        {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phoneNumber"><small>Phone number*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="PhoneNumber" 
                          name="phoneNumber"
                        />     
                        {errors.phoneNumber && touched.phoneNumber && <p className='text-red-500'>{errors.phoneNumber}</p>}
                      </div>
                    </div>

                    <p className='font-bold text-md px-5'>Address</p>
                    <div className="grid p-5 grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="streetName"><small>Street name*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Street name"
                          name="streetName"
                        />
                        {errors.streetName && touched.streetName && <p className='text-red-500'>{errors.streetName}</p>}
                      </div>

                      <div>
                        <label htmlFor="streetNumber"><small>Street Number*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Street number" 
                          name="streetNumber"
                        />
                        {errors.streetNumber && touched.streetNumber && <p className='text-red-500'>{errors.streetNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="zipCode"><small>Zip code*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="zip code" 
                          name="zipCode"
                        />
                        {errors.zipCode && touched.zipCode && <p className='text-red-500'>{errors.zipCode}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phoneNumber"><small>City*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Medellin" 
                          name="city"
                        />
                        {errors.city && touched.city && <p className='text-red-500'>{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="country"><small>Country*</small></label>
                        <Field
                          className={styles.inputModalContainer} 
                          type="text" 
                          placeholder="Colombia" 
                          name="country"
                        />
                        {errors.country && touched.country && <p className='text-red-500'>{errors.country}</p>}
                      </div>     
                    </div>

                    <p className='font-bold text-md px-5'>Main image</p>
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

export default CreateHotelModal

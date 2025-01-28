import { toast } from "react-toastify"
import { usePatientStore } from "../store/store"
import { Patient } from "../types/types"
import PatientDetailItem from "./PatientDetailItem"

type PateintDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient} : PateintDetailsProps) {
    
    const { deletePatient, getPatientById } = usePatientStore()
    
    const handleClick = () => {
        deletePatient(patient.id)
        toast('Patient deleted correctly', {
            type: 'error'
        })
    }

    return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shdow-md rounded-xl">
        <PatientDetailItem label='ID' value={patient.id}/>
        <PatientDetailItem label='Patient Name' value={patient.name}/>
        <PatientDetailItem label='Owner' value={patient.caretaker}/>
        <PatientDetailItem label='Contact email' value={patient.email}/>
        <PatientDetailItem label='Date registered' value={patient.date.toString()}/>
        <PatientDetailItem label='Symptoms' value={patient.symptoms}/>

        <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                onClick={() => getPatientById(patient.id)}
            >Edit</button>
            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                onClick={handleClick}
            >Delete</button>
        </div>
    </div>
  )
}

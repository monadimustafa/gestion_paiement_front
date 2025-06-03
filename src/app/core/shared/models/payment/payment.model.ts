import { Student } from "../student/student.model"


export enum PaymentStatus {
    CREATED,
    VALIDATED,
    CANCELED
}

export enum PaymentType {
    CASH,
    CHECK,
    TRANSFER,
    DEPOSIT
}

export interface Payment {
    id: string
    date: string
    amount: number
    type: PaymentType
    status: PaymentStatus
    file: string
    student: Student
}
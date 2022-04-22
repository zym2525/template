import dataApi from '@/constants/api';
import { post, get } from './request';

export type LoginInput = {
    username: string,
    password: string,
    imei: string,
    Mac: string,
    Version: string,
    Model: string
}

export type SubjectListItem = {
    gradeClassId: number
    gradeClassIsVirtual: boolean
    gradeClassName: string
    gradeId: number
    gradeName: string
    id: number
    name: string
}

export type LoginOutput = {
    userId: number;
    userName: string;
    userType: number;
    name: string;
    headPortraitUrl: string | null
    token: string
    ganKaoVipEndTime: string | null
    ganKaoVipStartTime: string | null
    gradeClassId: number | null
    gradeClassList: number[] | null
    gradeClassName: string
    gradeId: number
    gradeName: string
    headPortraitCheckStatus: number | null
    imei: number | null
    imeiBoundUserName: string | null
    isFreezon: boolean
    isLiveAdmin: boolean
    isLockoutEnabled: boolean
    liveStatus: number
    loginCode: number
    needUpdateVersion: boolean
    noteMacAddress: string | null
    openAspiration: number
    openGanKao: number
    openQuestionnaire: number
    padBindStatus: number
    password: string | null
    phaseId: number
    phoneNumber: string
    schoolId: number
    studentType: string
    subjects: SubjectListItem[]
    summary: string
    surName: string | null
    tag: number
    tenantId: number
}

export function login(params: LoginInput, resolve?: any, reject?: any) {
    return post<LoginOutput>(dataApi.user.login, params, resolve, reject);
}


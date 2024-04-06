import { request } from "../hook/api";
import { AddChildProps, AddProgramProps, PasswordUpdateProps, ProfileUpdateProps } from "./_model";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @param {string | null} xHash
 * @returns Response Data;
 */



class UserService {
    async getUserData() {
        try {
            const response = await request(
                '/parent/auth/register' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async profileUpdate(payload: ProfileUpdateProps) {
        try {
            const response = await request(
                '/parent/auth/profile-update' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async passwordUpdate(payload: PasswordUpdateProps) {
        try {
            const response = await request(
                '/parent/auth/password-update' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getAllPackages() {
        try {
            const response = await request(
                '/common/package/all' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getDayTime() {
        try {
            const response = await request(
                '/common/program/daytime' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
    
    async addChild(payload: AddChildProps){
        try {
            const response = await request(
                '/parent/child/add' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async addProgram(payload: AddProgramProps, id: number | string){
        try {
            const response = await request(
                `/parent/program/add/${id}` , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getCart(){
        try {
            const response = await request(
                '/parent/program/get/cart' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async deleteProgram(id: number | string){
        try {
            const response = await request(
                `/parent/program/del/cart/${id}` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getCurrency(){
        try {
            const response = await request(
                `/parent/get/currency` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getChildren(){
        try {
            const response = await request(
                `/parent/program/get/all` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getSurvey(){
        try {
            const response = await request(
                `/parent/survey/get` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async answerSurvey(id: string | number, payload: { response: boolean }){
        try {
            const response = await request(
                `/parent/survey/answer/${id}` , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


}


export default UserService;
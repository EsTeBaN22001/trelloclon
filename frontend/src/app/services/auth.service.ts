import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@environments/environment'
import { AvailabilityResponse } from '@models/request-status.model'
import { tap } from 'rxjs'
import { TokenService } from './token.service'
import { ResponseLogin } from '@models/auth.model'
import { changeUserinfoDto, User } from '@models/user.model'
import { checkToken } from '@interceptors/token.interceptor'

interface changeUserInfoResponseDto {
  success: string
  message: string
  newToken?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.API_URL}/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/login`, {
        email,
        password
      })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token)
        })
      )
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password
    })
  }

  isAvailable(email: string) {
    return this.http.post<AvailabilityResponse>(`${this.apiUrl}/is-available`, { email })
  }

  recovery(email: string) {
    return this.http.post<{ recoveryToken: string; link: string }>(`${this.apiUrl}/recovery`, { email })
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/change-password`, {
      token,
      newPassword
    })
  }

  logout() {
    this.tokenService.removeToken()
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`, { context: checkToken() })
  }

  changeUserinfo(dto: changeUserinfoDto) {
    console.log(dto)
    return this.http.post<changeUserInfoResponseDto>(`${this.apiUrl}/change-userinfo`, dto, { context: checkToken() })
  }
}

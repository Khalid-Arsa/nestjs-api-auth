"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_entity_1 = require("./auth.entity");
const class_validator_1 = require("class-validator");
let AuthService = class AuthService {
    constructor(userRepository, userService, jwtService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    validateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne(username);
            if (user && user.password === password) {
                const { password, username } = user, rest = __rest(user, ["password", "username"]);
                return rest;
            }
            ;
            return null;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                name: user.name,
                sub: user.id
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    add(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, email, password } = dto;
            let newUser = new auth_entity_1.AuthEntity();
            newUser.username = username;
            newUser.email = email;
            newUser.password = password;
            newUser.name = name;
            const errors = yield (0, class_validator_1.validate)(newUser);
            if (errors.length > 0) {
                const _errors = { username: 'Userinput is not valid.' };
                throw new common_1.HttpException({ message: 'Input data validation failed', _errors }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const savedUser = yield this.userRepository.save(newUser);
                return this.buildAuthRO(savedUser);
            }
        });
    }
    buildAuthRO(user) {
        const userRO = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
        };
        return { user: userRO };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auth_entity_1.AuthEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../lib/entities/user.entity");
const error_1 = require("../shared/error");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, firstName, lastName, email } = req.user;
            const token = this.jwtService.sign({
                id, firstName, lastName, email
            });
            return res.status(201).json({
                success: true,
                message: 'Signin successful',
                firstName: firstName,
                lastName: lastName,
                email: email,
                token,
            });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password } = req.body;
                const isUserExist = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.email = :email', { email })
                    .getOne();
                if (isUserExist) {
                    return new error_1.AppError('Username and email must be unique.', 400);
                }
                let newUser = new user_entity_1.UserEntity();
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.email = email;
                newUser.password = password;
                const error = yield (0, class_validator_1.validate)(newUser);
                if (error.length > 0) {
                    return new error_1.AppError('Input data validation failed', 400, error);
                }
                else {
                    const savedUser = yield this.userRepository.save(newUser);
                    return this.buildUserRO(savedUser, res);
                }
            }
            catch (error) {
                console.log("Error: ", error);
            }
        });
    }
    buildUserRO(user, res) {
        const userRO = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
        return res.status(201).json({
            user: userRO,
            message: "Create user successfully",
            success: true
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
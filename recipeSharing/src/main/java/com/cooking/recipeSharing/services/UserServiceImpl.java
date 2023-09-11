package com.cooking.recipeSharing.services;

import java.util.*;
import java.util.regex.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.model.*;
import com.cooking.recipeSharing.repositories.*;
import org.springframework.transaction.annotation.Transactional;

// import com.twilio.Twilio;
// import com.twilio.rest.api.v2010.account.Message;
// import com.twilio.type.PhoneNumber;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpRequestDto otpRequestDto;

    @Value("${sinch.request.token}")
    private String sinchToken;

    @Value("${sinch.request.url}")
    private String sinchRequestUrl;

    @Override
    public UserProfileDto addNewUser(UserDto newUserRegisterDto) {
        var password = newUserRegisterDto.getPassword();

        if (!isValidPhoneNumber(newUserRegisterDto.getPhoneNumber())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid phone number format (valid format e.g : 9999999999)");
        }
        if (!isValidPassword(password)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid password !! (1. password must contain atleast one digit 2. one small letter a-z 3. One capital letter A-Z  4. One special character, no white space 5. Password length should be between 8 to 14)");
        }
        newUserRegisterDto.setPassword(passwordEncoder.encode(password));
        UserEntity signUpDetails = new UserEntity(newUserRegisterDto);
        userRepo.saveAndFlush(signUpDetails);
        System.out.println(" phoneNumber : " + newUserRegisterDto.getPhoneNumber()
                + " pass : " + password + " registered successfully");
        return new UserProfileDto(signUpDetails);
    }

    public boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return false;
        }

        String phoneNumberRegex = "^\\d{10}$";
        // Compile the regex pattern and Match the email against the pattern
        Pattern pattern = Pattern.compile(phoneNumberRegex);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    public boolean isValidPassword(String password) {
        if (password.isEmpty()) {
            return false;
        }
        // password must contain atleast one digit
        // one small letter a-z, one capital letter A-Z
        // one special character, no white space and length should be between 8 to 14.
        String pwdRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!.@#$><:;',%^&-+=()])(?=\\S+$).{8,14}$";
        // Compile the regex pattern and Match the phone number against the pattern
        Pattern pattern = Pattern.compile(pwdRegex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    @Override
    public UserProfileDto login(UserLoginDto loginDto) {
        String phoneNumber = loginDto.getPhoneNumber();
        String password = loginDto.getPassword();

        Optional<UserEntity> userEntity = userRepo.findByPhoneNumber(phoneNumber);
        if (userEntity.isPresent()) {
            if (passwordEncoder.matches(password, userEntity.get().getPassword())) {
                System.out.println("Username : " + userEntity.get().getFirstName() + " phoneNumber : " + phoneNumber
                        + " pass : " + password + " logged in successfully");
                return new UserProfileDto(userEntity.get());
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid phone number !!! Please try again.. ");
    }

    @Override
    public UserProfileDto getUserProfileById(Long userId) {
        Optional<UserEntity> user = userRepo.findById(userId);
        return new UserProfileDto(user.get());
    }

    @Override
    public UserProfileDto updateUserProfileById(UserProfileDto userDetails) {
        var user = userRepo.findById(userDetails.getId());

        if (!isValidPhoneNumber(userDetails.getPhoneNumber())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid phone number format (valid format e.g : 9999999999) && phone number should not be null");
        }
        if (user.isPresent()) {
            var userEntity = user.get();
            userEntity.SetUserEntity(userDetails);
            userRepo.saveAndFlush(userEntity);

            return new UserProfileDto(userEntity);
        }

        return null;
    }

    @Override
    public void generateOTPByPhoneNumber(String phoneNumber) {
        var userEntityOptional = userRepo.findByPhoneNumber(phoneNumber);
        if (!userEntityOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid phone number. No registered user matching provided phone number");
        }

        var otp = generateOTP();
        var userEntity = userEntityOptional.get();
        userEntity.setOtp(otp);
        userRepo.saveAndFlush(userEntity);

        sendOTP(phoneNumber, otp);
    }

    private long generateOTP() {
        long max = 999999, min = 111111;
        return (new Random().nextLong(max - min) + min);
    }

    private void sendOTP(String userPhoneNumber, long otp) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(sinchToken);

        otpRequestDto.setTo(userPhoneNumber, otp);

        HttpEntity<?> entity = new HttpEntity<>(otpRequestDto, headers);

        restTemplate.postForEntity(sinchRequestUrl, entity, String.class);

        /*
         * otpRequestDto.setTo(userPhoneNumber, otp);
         * 
         * Twilio.init(otpRequestDto.accountSid, otpRequestDto.authToken);
         * Message message = Message.creator(
         * new PhoneNumber(otpRequestDto.to),
         * new PhoneNumber(otpRequestDto.from),
         * otpRequestDto.body)
         * .create();
         * 
         * System.out.println(message.getSid());
         */
    }

    @Override
    public void deleteUserById(Long userId) {
        Optional<UserEntity> userDetails = userRepo.findById(userId);
        userDetails.ifPresent(user -> userRepo.delete(user));
    }

    @Override
    public UserDto validateOtpAndPwdByPhoneNumber(String phoneNumber, Long otp, String password) {
        Optional<UserEntity> user = userRepo.findByPhoneNumber(phoneNumber);
        String storedOtp = String.valueOf(user.get().getOtp());
        String receivedotp = String.valueOf(otp);
   

        if (!storedOtp.equals(receivedotp)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid OTP. Please check and try again.");
        }
        if (!isValidPassword(password)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid password !! (1. password must contain atleast one digit 2. one small letter a-z 3. One capital letter A-Z  4. One special character, no white space 5. Password length should be between 8 to 14)");
        }
        if (passwordEncoder.matches(password, user.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "New password matches with the previous password. Please use a different password.");
        }

        // If all conditions are satisfied, update the password
        user.get().setPassword(passwordEncoder.encode(password));
        user.get().updatePassword(passwordEncoder.encode(password));
        userRepo.saveAndFlush(user.get());

        // System.out.println(" phoneNumber : " + user.get().getPhoneNumber() + "entered pass : " + password
        //         + " new db pass : " + user.get().getPassword() + " updated pwd successfully");

        return new UserDto(user.get());

    }

   
}
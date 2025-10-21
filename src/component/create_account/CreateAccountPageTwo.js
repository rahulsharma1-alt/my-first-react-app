import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import promo from '../login/promo.jpg';
import brands from '../login/brands.jpg';
import { useLocation } from 'react-router-dom';
import './CreateAccount.css';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters long')
        .max(20, 'Username cannot exceed 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .required('Username is required'),

    pin: yup
        .string()
        .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
        .required('PIN is required'),

    question: yup
        .string()
        .oneOf(
            ['pet', 'school', 'teacher', 'city'],
            'Please select a valid security question'
        )
        .required('Security question is required'),

    answer: yup
        .string()
        .min(2, 'Answer must be at least 2 characters')
        .max(50, 'Answer cannot exceed 50 characters')
        .required('Security answer is required'),
});

const CreateAccountPageTwo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { firstName, lastName, dob, countryCode, phone, country, address } = location.state || {};
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        alert('Form submitted successfully!');
        navigate('/');
        // navigate or API call here
    };

    return (
        <div className="wrapper">
            <div className='content-wrapper'>
                <div className="space-y-4 max-w-md mx-auto">
                    <div className="login-header flex justify-between items-center">
                        <label className="login-header-text text-xl font-bold">Register</label>
                        <button onClick={() => navigate(-1)} className="h-5 w-5">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
                                <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                    <img src={promo} alt="Banner" className="login-promo" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                    <div className="login-content">
                        {/* Email */}
                        <div className="flex-1 flex flex-col">
                            <label className="login-label">Email Address</label>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Email Address"
                                className={`login-input ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        {/* Username and PIN */}
                        <div className="flex flex-row space-x-4">
                            <div className="flex-1 flex flex-col">
                                <label className="login-label">User Name</label>
                                <input
                                    type="text"
                                    {...register('username')}
                                    placeholder="User Name"
                                    className={`login-input ${errors.username ? 'border-red-500' : ''}`}
                                />
                                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="login-label">PIN</label>
                                <input
                                    type="password"
                                    {...register('pin')}
                                    placeholder="PIN"
                                    className={`login-input ${errors.pin ? 'border-red-500' : ''}`}
                                />
                                {errors.pin && <p className="text-red-500 text-xs">{errors.pin.message}</p>}
                            </div>
                        </div>

                        {/* Security Question */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Security Question</label>
                            <select
                                {...register('question')}
                                className={`login-input text-xs ${errors.question ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select Question</option>
                                <option value="pet">What is your pet name?</option>
                                <option value="school">What is your favourite school?</option>
                                <option value="teacher">Who is your favourite teacher?</option>
                                <option value="city">What is your favourite city?</option>
                            </select>
                            {errors.question && <p className="text-red-500 text-xs">{errors.question.message}</p>}
                        </div>

                        {/* Security Answer */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Security Answer</label>
                            <input
                                type="text"
                                {...register('answer')}
                                placeholder="Your answer"
                                className={`login-input ${errors.answer ? 'border-red-500' : ''}`}
                            />
                            {errors.answer && <p className="text-red-500 text-xs">{errors.answer.message}</p>}
                            <label className="text-xs text-gray-500 pt-2">
                                You must be over 18 to play with us. If we can’t verify your age electronically, we will require documents to verify your age.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`button mt-10 mb-5 px-4 py-2 rounded ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'NEXT'}
                        </button>
                    </div>
                </form>
                <img src={brands} alt="Brands" className="login-promo" />
            </div>
        </div>
    );
};

export default CreateAccountPageTwo;

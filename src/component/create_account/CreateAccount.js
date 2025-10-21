import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import promo from '../login/promo.jpg';
import brands from '../login/brands.jpg';
import './CreateAccount.css';
const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    dob: yup.date().required('Date of birth is required'),
    countryCode: yup.string().required('Country code is required'),
    phone: yup
        .string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    country: yup.string().required('Country is required'),
    address: yup
        .string()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
});

const CreateAccount = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        navigate('/create-account-page-two', {
            state: {
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                countryCode: data.countryCode,
                phone: data.phone,
                country: data.country,
                address: data.address,
            }
        })
        // console.log('Form submitted:', data);
        // alert('Form submitted successfully!');
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
                        {/* First and Last Name */}
                        <div className="flex flex-row space-x-4">
                            <div className="flex-1 flex flex-col">
                                <label className="login-label">First Name</label>
                                <input
                                    type="text"
                                    {...register('firstName')}
                                    placeholder="First Name"
                                    className={`login-input ${errors.firstName ? 'border-red-500' : ''}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="login-label">Last Name</label>
                                <input
                                    type="text"
                                    {...register('lastName')}
                                    placeholder="Last Name"
                                    className={`login-input ${errors.lastName ? 'border-red-500' : ''}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dob')}
                                className={`login-input ${errors.dob ? 'border-red-500' : ''}`}
                            />
                            {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                            <label className="text-xs text-gray-500 pt-2">
                                You must be over 18 to play with us. If we can’t verify your age electronically, we will require documents to verify your age.
                            </label>
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Phone Number</label>
                            <div className="flex space-x-2">
                                <select
                                    {...register('countryCode')}
                                    className={`border rounded px-2 text-xs text-gray-700 ${errors.countryCode ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+44">🇬🇧 +44</option>
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+61">🇦🇺 +61</option>
                                </select>
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    placeholder="Enter mobile number"
                                    className={`flex-1 border rounded px-3 py-2 text-xs ${errors.phone ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                            <label className="text-xs text-gray-500 pt-2">
                                In case you forget your password we can send information to this number to help you access your account.
                            </label>
                        </div>

                        {/* Country */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Country</label>
                            <select
                                {...register('country')}
                                className={`login-input text-xs ${errors.country ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select country</option>
                                <option value="usa">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="in">India</option>
                                <option value="aus">Australia</option>
                            </select>
                            {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
                        </div>

                        {/* Address */}
                        <div className="flex flex-col pt-6">
                            <label className="login-label">Postal Code Address</label>
                            <input
                                type="text"
                                {...register('address')}
                                placeholder="Brookfield, UK"
                                className={`login-input ${errors.address ? 'border-red-500' : ''}`}
                            />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                            <label className="text-xs text-gray-500 pt-2">
                                To set up your account, please make sure your home address matches your official & personal documentation.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="button mt-10 mb-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

export default CreateAccount;

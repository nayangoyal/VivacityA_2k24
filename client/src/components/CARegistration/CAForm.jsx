import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reel from './Reel1.mp4';
import CaRegistrationPage from './CARegistrationPage';
import "./Registration.css"

const stateValues = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];

const CaForm = () => {
    const navigate = useNavigate();
    //  VALUES FOR RESETTING THE FORM
    const InitialValues = {
        Name: '',
        Gender: '',
        CreatePass: '',
        Email: '',
        Phone: '',
        ConfirmPass: '',
    };
    const InitialCollegeValues = {
        State: '',
        District: '',
        CollegeName: '',
        Degree: '',
    };

    const [personalDetails, setPersonalDetails] = useState(InitialValues);
    const [collegeDetails, setCollegeDetails] = useState(InitialCollegeValues);
    const [collegeForm, showCollegeDetails] = useState(false);
    const [formDisplay, showForm] = useState(true);
    const [Warning, setWarning] = useState('');
    //   P E R S O N A L   D E T A I L S  S E C T I O N

    const personalDetailsChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value,
        });
    };
    const NextFormHandler = event => {
        event.preventDefault();
        if (
            personalDetails.Name === '' ||
            personalDetails.Gender === '' ||
            personalDetails.ConfirmPass === '' ||
            personalDetails.CreatePass === '' ||
            personalDetails.Phone === ''
        ) {
            setWarning('Enter All Fields');
            return;
        }
        if (personalDetails.Phone.length !== 10) {
            setWarning('Phone Number Digits Not equal to 10');
            return;
        }
        if (personalDetails.ConfirmPass != personalDetails.CreatePass) {
            setWarning('Passwords Do Not Match');
            return;
        } else {
            //  Will Show the College Details Form
            setWarning('');
            showCollegeDetails(true);
        }
    };

    const PersonalDetailsClearHandler = event => {
        event.preventDefault();
        setPersonalDetails(InitialValues);
    };

    //    C O L L E G E   D E T A I L S   S E C T I O N

    const CollegeDetailsClearHandler = event => {
        event.preventDefault();
        setCollegeDetails(InitialCollegeValues);
    };

    const collegeDetailsChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setCollegeDetails({
            ...collegeDetails,
            [name]: value,
        });
    };

    const CollegeDetailsSubmitHandler = event => {
        event.preventDefault();
        if (
            collegeDetails.District === '' ||
            collegeDetails.Degree === '' ||
            collegeDetails.CollegeName === '' ||
            collegeDetails.State === '' 
            
        ) {
            setWarning('Enter All Fields');
            return;
        }

        //  Will Submit the Form
        navigate('/successful');
        SubmitHandler();
    };

    //    F O R M   S U B M I T   H A N D L E R
    const SubmitHandler = () => {
        //  All the values required for DataBase is stored in personalDetails and collegeDetails
        console.log('Personal Details are ', personalDetails);
        console.log('College Details are ', collegeDetails);
        showForm(false);
    };

    //       A P I       T O     F E T C H     C I T I E S

    async function getCitiesInState(country, state) {
        const url =
            'https://countriesnow.space/api/v0.1/countries/state/cities';
        const data = {
            country,
            state,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
                // Request failed with status: ${response.status},
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [cities, setCities] = useState([]);

    const fetchCities = async (country, state) => {
        try {
            const response = await getCitiesInState(country, state);

            if (!response.error) {
                setCities(response.data);
                // console.log(response.data);
            } else {
                // console.log(response.data);
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (collegeDetails.State) {
            fetchCities('India', collegeDetails.State);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeDetails.State]);

    return (
        <div className='bg-registration'>
            <div>
                <CaRegistrationPage />
            </div>
            <div className="lg:flex lg:justify-center lg:flex-row flex-col ">
                <div className="justify-center w-1/2  mx-auto lg:w-1/5 flex items-center rounded-xl">
                    <video
                        className="rounded-xl"
                        width={360}
                        autoPlay
                        muted
                        loop
                    >
                        <source src={Reel}></source>
                    </video>
                </div>

                <div className=" justify-center lg:py-0  lg:w-1/2">
                    {/* P E R S O N A L   D E T A I L S   F O R M */}
                    {formDisplay && (
                        <form>
                            {!collegeForm && (
                                <div className="PersonalDetails lg:w-2/3 p-4 rounded-xl">
                                    <div className="PersonalDetailsForm mt-4 space-y-2">
                                        <div className="PersonalDetailsForm mt-4 space-y-4 text-left">
                                            <div className="flex lg:flex-row flex-col w-full">
                                                <div className="text-left  w-full mr-2">
                                                    <label className="text-white font-mabry">
                                                        Name
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2 my-2 font-mabry bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Amit Mahan"
                                                        type="text"
                                                        name="Name"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.Name
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="text-left w-full">
                                                    <label className="text-white font-mabry">
                                                        Gender{' '}
                                                        <span className="text-red-500 m-2 font-mabry">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="w-full font-mabry px-4 py-2 my-2 bg-gray-800 text-white border border-black rounded-lg"
                                                        name="Gender"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.Gender
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Gender
                                                        </option>
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                        <option value="Others">
                                                            Others
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-white font-mabry">
                                                    E-mail address
                                                    <span className="text-red-500 m-2 font-mabry">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2 my-2 font-mabry bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    placeholder="Email ID *"
                                                    type="email"
                                                    name="Email"
                                                    onChange={
                                                        personalDetailsChangeHandler
                                                    }
                                                    value={
                                                        personalDetails.Email
                                                    }
                                                ></input>
                                            </div>
                                            <div>
                                                <label className="text-white font-mabry">
                                                    Phone
                                                    <span className="text-red-500 m-2 font-mabry">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2 my-2 font-mabry bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    placeholder="Phone Number *"
                                                    name="Phone"
                                                    onChange={
                                                        personalDetailsChangeHandler
                                                    }
                                                    value={
                                                        personalDetails.Phone
                                                    }
                                                ></input>
                                            </div>
                                            <div className="lg:flex-row flex-col">
                                                <div className="">
                                                    <label className="text-white font-mabry">
                                                        Create Password
                                                        <span className="text-red-500 m-2 font-mabry">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2 my-2 font-mabry bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Amit@05"
                                                        type="password"
                                                        name="CreatePass"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.CreatePass
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="">
                                                    <label className="text-white font-mabry">
                                                        Confirm Password
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2 font-mabry my-2 bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Amit@05"
                                                        type="password"
                                                        name="ConfirmPass"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.ConfirmPass
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sky-700 text-center font-mabry">
                                            {Warning}
                                        </p>
                                        
                                        <div className='flex justify-center'>
                                            <button
                                            onClick={NextFormHandler}
                                            className="flex m-4 text-white dark:text-black group relative cursor-pointer overflow-hidden whitespace-nowrap h-11 px-6  [background:var(--bg)] [border-radius:var(--radius)] transition-all shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset] hover:scale-105 duration-300  w-max  items-center justify-center  hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]">
                                                <div className="absolute inset-0 overflow-visible [container-type:size]">
                                                <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none] ">
                                                    <div className="absolute inset-[-100%] w-auto rotate-0 animate-spin [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))] [translate:0_0]">
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]">
                                                </div>
                                                <span className="relative whitespace-pre text-center text-base font-semibold leading-none tracking-tight text-white z-10 font-mabry">Next</span>
                                            </button>
                                            <button
                                            onClick={PersonalDetailsClearHandler}
                                            className="clearButton flex m-4 text-white dark:text-black group relative cursor-pointer overflow-hidden whitespace-nowrap h-11 px-6  [background:var(--bg)] [border-radius:var(--radius)] transition-all shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset] hover:scale-105 duration-300  w-max  items-center justify-center  hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]">
                                                <div className="absolute inset-0 overflow-visible [container-type:size]">
                                                <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none] ">
                                                    <div className="absolute inset-[-100%] w-auto rotate-0 animate-spin [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))] [translate:0_0]">
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]">
                                                </div>
                                                <span className="relative whitespace-pre text-center text-base font-semibold leading-none tracking-tight text-white z-10 font-mabry">Clear</span>
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )}

                            {/* C O L L E G E   D E T A I L S   F O R M */}
                            {collegeForm && (
                                <div className="CollegeDetails lg:w-2/3  lg:mt-4 mt-8 lg:p-4  text-left   rounded-xl">
                                    <div className="CollegeDetailsForm   space-y-2">
                                        <div>
                                            <label className="text-white">
                                                State
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                id="country-state"
                                                name="State"
                                                onChange={
                                                    collegeDetailsChangeHandler
                                                }
                                            >
                                                <option
                                                    value=""
                                                    className="w-1/2"
                                                    disabled
                                                    selected
                                                >
                                                    Select State
                                                </option>
                                                {stateValues.map(
                                                    (name, index) => (
                                                        <option
                                                            className="w-1/2"
                                                            key={index}
                                                            value={name}
                                                        >
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                        {collegeDetails.State && (
                                            <div className="lg:mt-8">
                                                <label className="text-white space-y-4">
                                                    District
                                                    <span className="text-red-500 m-2">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    id="country-district"
                                                    name="District"
                                                    onChange={
                                                        collegeDetailsChangeHandler
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        className="w-1/2"
                                                        disabled
                                                        selected
                                                    >
                                                        Select District
                                                    </option>
                                                    {cities.map(
                                                        (name, index) => (
                                                            <option
                                                                className="w-1/2"
                                                                key={index}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        )}

                                        <div className="lg:mt-8">
                                            <label className="text-white space-y-4">
                                                College Name
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                                <input
                                                    className="w-full px-4 py-2   bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    type="text"
                                                    name="CollegeName"
                                                    placeholder="NIT Delhi"
                                                    value={
                                                        collegeDetails.CollegeName
                                                    }
                                                    onChange={
                                                        collegeDetailsChangeHandler
                                                    }
                                                ></input>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="text-white">
                                                Degree
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                className="w-full px-4 my-2 py-2 bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                type="text"
                                                name="Degree"
                                                placeholder="BTech in Computer Science"
                                                value={collegeDetails.Degree}
                                                onChange={
                                                    collegeDetailsChangeHandler
                                                }
                                            ></input>
                                        </div>

                                        <div className="text-center lg:py-0 py-4">
                                            <p className="text-sky-700 text-center">
                                                {Warning}
                                            </p>
                                            <button
                                            onClick={CollegeDetailsSubmitHandler}
                                            className="flex text-white dark:text-black group relative cursor-pointer overflow-hidden whitespace-nowrap h-11 px-6  [background:var(--bg)] [border-radius:var(--radius)] transition-all shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset] hover:scale-105 duration-300  w-max  items-center justify-center  hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]">
                                                <div className="absolute inset-0 overflow-visible [container-type:size]">
                                                <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none] ">
                                                    <div className="absolute inset-[-100%] w-auto rotate-0 animate-spin [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))] [translate:0_0]">
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]">
                                                </div>
                                                <span className="relative whitespace-pre text-center text-base font-semibold leading-none tracking-tight text-white z-10 font-mabry">Submit</span>
                                            </button>
                                            <button
                                            onClick={CollegeDetailsClearHandler}
                                            className="flex text-white dark:text-black group relative cursor-pointer overflow-hidden whitespace-nowrap h-11 px-6  [background:var(--bg)] [border-radius:var(--radius)] transition-all shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset] hover:scale-105 duration-300  w-max  items-center justify-center  hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]">
                                                <div className="absolute inset-0 overflow-visible [container-type:size]">
                                                <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none] ">
                                                    <div className="absolute inset-[-100%] w-auto rotate-0 animate-spin [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))] [translate:0_0]">
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]">
                                                </div>
                                                <span className="relative whitespace-pre text-center text-base font-semibold leading-none tracking-tight text-white z-10 font-mabry">Clear</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CaForm;

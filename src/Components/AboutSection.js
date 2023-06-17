export default function AboutSection(){
    return(
        <div className="p-4">
            <h1 className="text-center text-3xl font-bold">
                About
            </h1>
            <p className="text-left text-xl mt-10 text-justify">
            The doctor consultation app is a platform designed to facilitate virtual consultations between doctors and patients. Users can connect with healthcare professionals remotely to seek medical advice, discuss symptoms, and receive guidance on potential treatment options.

            The app integrates real-time video communication using WebRTC technology, allowing doctors and patients to have face-to-face interactions from the comfort of their own homes. By leveraging the power of Node.js and Socket.IO, the app enables seamless and secure communication between users, ensuring the privacy and confidentiality of medical information.
            <br/>
            <br/>
            In addition to video consultations, the app also provides a feature for users to access first aid help. Users can search for specific medical conditions or symptoms to get immediate guidance and recommended first aid measures. This helps users take appropriate actions in emergency situations before seeking professional medical assistance.

            By combining the convenience of remote consultations with the availability of first aid information, the doctor consultation app aims to provide timely and reliable medical support to users, empowering them to make informed decisions about their health and well-being.
            </p>
        </div>
    )
}
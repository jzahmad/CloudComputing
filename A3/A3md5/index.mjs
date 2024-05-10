import crypto from 'crypto';
import axios from 'axios';

export const handler = async (event) => {
    try {
        const action = event.action;
        const value = event.value;
        const courseUri = event.course_uri;
        
        // Hash the value using MD5
        const hashedValue = crypto.createHash('md5').update(value).digest('hex');
        
        // Prepare the data to send in the POST request
        const postData = {
            banner: "B00889804",
            result: hashedValue,
            arn: "arn:aws:lambda:us-east-1:767397661521:function:A3sha256",
            action: action,
            value: value
        };

        // Make an HTTP POST request to the course_uri
        const response = await axios.post(courseUri, postData);

        // Return the response from the POST request
        return {
            statusCode: response.status,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error'
            })
        };
    }
};

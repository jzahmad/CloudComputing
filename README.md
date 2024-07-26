This code implements a distributed system with two containers (`con1_server` and `con2_server`) communicating over a
network. `con1_server`, written in Node.js with Express, receives a file and product name from the user. It then sends
the request to `con2_server`, also written in Node.js, for processing. `con2_server` calculates the sum of amounts for
the given product in the CSV file. The results are returned to the user. Additionally, a separate application (A2)
written in Node.js with Express, interacts with a MySQL database to store and retrieve product data. This setup
demonstrates a distributed system for data processing and storage. All of the codes use cloud services including `EC2, Beanstalk, VPC, RDS, S3, SNS, SQS, AWS Lambda, API Gateway, Step functions`

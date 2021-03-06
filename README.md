# NY State COVID-19 React App hosted in AWS with CI/CD

React application displaying the current and historical COVID-19 data for the state of New York. Data provided by [Covid Act Now API](https://apidocs.covidactnow.org/).

The application is deployed in [react.jorgedemo.com](https://react.jorgedemo.com).
## The CI/CD pipeline used in AWS is the following:

Using the Developer Tools on AWS, CodePiline starts the continuous delivery when it detects a change in this repository main branch.

![source](https://raw.githubusercontent.com/gorj3/nystate-covid19-stats/main/readme_img/source.PNG)


 AWS CodePipeline takes the source code and builds it for continuous integration with AWS CodeBuild, using the configuration from [buildspec.yml](https://raw.githubusercontent.com/gorj3/nystate-covid19-stats/main/buildspec.yml).

![build](https://raw.githubusercontent.com/gorj3/nystate-covid19-stats/main/readme_img/build.PNG)

After the files has been created, AWS CodeDeploy copies the files into an AWS S3 stage bucket for web testing: 
[http://stagereact.jorgedemo.com.s3-website-us-east-1.amazonaws.com/](http://stagereact.jorgedemo.com.s3-website-us-east-1.amazonaws.com/)
  
![deploy](https://raw.githubusercontent.com/gorj3/nystate-covid19-stats/main/readme_img/stage.PNG)

Finally, after reviewing the changes, I can manually approve the changes to be pushed into the production environment, hosted at [react.jorgedemo.com](https://react.jorgedemo.com).

![prod](https://raw.githubusercontent.com/gorj3/nystate-covid19-stats/main/readme_img/approval.PNG)

The content in prod is served with an AWS CloudFront CDN, which also provides SSL encryption. The domain is hosted in AWS Route53.


---
### Libraries used in this app
- [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [React CountUp](https://github.com/glennreyes/react-countup)
- [axios](https://github.com/axios/axios)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
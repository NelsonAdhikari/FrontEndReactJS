import Base from "../components/Base";

function Services(){
    return (
        <Base
        title="Services We offer"
        description="A Pencil A Day Helps You Work, Rest And Play."
        buttonEnabled={true}
        buttonLink="/"
        buttonType="warning"
        buttonText="Home"
        >
            <div>This is Services Page </div>
        </Base>
    );
  
}
export default Services;
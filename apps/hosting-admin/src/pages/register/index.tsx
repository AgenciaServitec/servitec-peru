import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PersonalInformation } from "./PersonalInformation.tsx";
import { AccessData } from "./AccessData.tsx";

interface Step1Form {
  dni: string;
  [key: string]: any;
}

export function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Form | null>(null);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmitAccessData = (user: Step1Form) => {
    setStep1Data(user);
    nextStep();
  };

  return (
    <CenteredRegisterLayout>
      <FormContainer>
        <LogoWrapper>
          <LogoImage src="/logo-servitec.png" alt="Servitec Logo" />
        </LogoWrapper>

        <StepsContent className="step-content-container">
          {currentStep === 0 && <AccessData onNext={onSubmitAccessData} />}
          {currentStep === 1 && (
            <PersonalInformation
              onBack={prevStep}
              currentStep={currentStep}
              step1Data={step1Data}
            />
          )}
        </StepsContent>

        <StepIndicatorSection>
          <ProgressBarContainer>
            <ProgressFillBar step={currentStep} />
          </ProgressBarContainer>
          <ProgressTextLabel>
            {currentStep === 0 && "Paso 1 de 2: Datos de identificación"}
            {currentStep === 1 && "Paso 2 de 2: Información personal"}
          </ProgressTextLabel>
        </StepIndicatorSection>

        <LoginLink>
          ¿Ya tienes una cuenta de acceso? <Link to="/">Iniciar sesión</Link>
        </LoginLink>
      </FormContainer>
    </CenteredRegisterLayout>
  );
}

const CenteredRegisterLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background: #09090b;
  padding: 2em;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInContainer 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeInContainer {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  max-height: 36px;
  width: auto;
  object-fit: contain;
`;

const StepsContent = styled.div`
  width: 100%;
  margin-bottom: 1.5em;

  .security-info-box,
  div[style*="border: 1px dashed"],
  div[style*="border-style: dashed"] {
    border: 1px dashed #27272a !important;
    background: #141416 !important;
    border-radius: 6px !important;
    transition: all 0.3s ease;
  }
`;

const StepIndicatorSection = styled.div`
  width: 100%;
  margin-bottom: 1.8em;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 3px;
  background: #18181b;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFillBar = styled.div<{ step: number }>`
  height: 100%;
  background: #ffffff;
  width: ${({ step }) => ((step + 1) / 2) * 100}%;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProgressTextLabel = styled.p`
  font-size: 0.76em;
  color: #52525b;
  margin: 0;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 0.5em;
  color: #71717a;
  font-size: 0.9em;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.4em;
    transition: color 0.2s ease;

    &:hover {
      color: #e4e4e7;
      text-decoration: underline;
    }
  }
`;

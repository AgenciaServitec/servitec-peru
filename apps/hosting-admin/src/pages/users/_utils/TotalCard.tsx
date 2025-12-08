import styled from "styled-components";

export const TotalCard = ({
  total,
  normalPay,
  sundayMinutes,
  sundayPayment,
  lunchBonus,
  lunchFalseCount,
  foodVoucher,
  grandTotal,
}) => (
  <Card>
    <Header>Total trabajado: {total} min</Header>

    <Label>Pago normal: S/{normalPay.toFixed(2)}</Label>

    {sundayMinutes > 0 && (
      <Label>
        Domingo: {sundayMinutes}m × 0.08333 = S/{sundayPayment.toFixed(2)}
      </Label>
    )}

    {lunchBonus > 0 && (
      <Label>
        Almuerzo: {lunchFalseCount} × S/{foodVoucher} = S/
        {lunchBonus.toFixed(2)}
      </Label>
    )}

    <Divider />

    <TotalText>Total: S/{grandTotal.toFixed(2)}</TotalText>
  </Card>
);

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  border-radius: 16px;

  padding: 22px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(2px);

  transition: 0.25s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

const Header = styled.h4`
  margin: 0;
  font-size: 1.15rem;
  color: #f0f0f5;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const Label = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #c9cad3;
  letter-spacing: 0.2px;
`;

const Highlight = styled.span`
  color: #7dd3fc; /* celeste suave */
  font-weight: 600;
`;

const TotalText = styled.h3`
  margin-top: 12px;
  font-size: 1.5rem;
  color: #4ade80; /* verde elegante */
  font-weight: 700;
  text-align: right;
  letter-spacing: 0.5px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  margin: 6px 0 4px 0;
`;

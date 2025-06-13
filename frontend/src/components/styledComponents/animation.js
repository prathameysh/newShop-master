import { keyframes } from "@mui/system";

export const fromToAnimation = (from, to) => keyframes`
  from {
   ${from} 
  }
  to {
   ${to} 
  }
`;

export const fromOnlyAnimation = (fromOnly) => keyframes`
  from {
   ${fromOnly} 
  }
`;

export const full1Animation = (full) => keyframes`
 100%{
  ${full}
 }
`;

export const full2Animation = (first, second) => keyframes`
   0%{
     ${first}
   }
   100%{
     ${second}
   }
 
`;
export const full14Animation = (first, second, third, fourth) => keyframes`
  25%{
    ${first}
  }
  50%{
    ${second}
  }
  75%{
    ${third}
  }
  100%{
    ${fourth}
 }
`;
export const ownAnimation = (full) => keyframes`
 ${full}
`;

import { useState } from "react";

import AccessControlManager from "./AccessControlManager";

export default function AccessControlStep({ accessControl, setAccessControl }) {
  return (
    <AccessControlManager value={accessControl} onChange={setAccessControl} />
  );
}

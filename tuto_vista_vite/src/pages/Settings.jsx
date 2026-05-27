import React from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import EditChart from "../features/dashboard/Perfil/EditChart";

/**
 * Settings Page
 * Wraps the EditChart component in the MainLayout to provide
 * a consistent navigation experience.
 */
const Settings = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <EditChart />
      </div>
    </MainLayout>
  );
};

export default Settings;

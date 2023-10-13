import { Button, Modal } from "antd";
import React from "react";
import MultiLineChart from "./MultiLineChart";

const ModalComponent = ({ visible, onClose }) => {
  return (
    <Modal
      style={{ marginTop: "-20px" }}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {/* <h2>Data</h2> */}
      <MultiLineChart />
    </Modal>
  );
};

export default ModalComponent;

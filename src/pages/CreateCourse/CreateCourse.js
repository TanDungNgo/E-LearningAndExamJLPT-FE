import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useState } from "react";
import { Progress } from "antd";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Upload,
  Image,
  InputNumber,
  Switch,
} from "antd";
const cx = classNames.bind(styles);
const { Option } = Select;

const CreateCourse = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const onFinish = (values) => {
    // setIsSubmitting(true);
    setProgress(100);
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={cx("container")}>
      <img className={cx("bg-create")} src="/images/bg_create-course.png" />
      <div className={cx("card-create")}>
        <div className={cx("card-create__title")}>Create a new course</div>
        <div className={cx("card-create__content")}>
          <div className={cx("card-create__left")}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="horizontal">
              <Form.Item className={cx("card-create__left-content")}
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input 
                  style={{marginLeft: '12%', width: '88%'}}
                />
              </Form.Item>
              <Form.Item className={cx("card-create__left-content")}
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input a description!" },
                  {
                    max: 100,
                    message: "Description should be less than 100 characters!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item className={cx("card-create__left-content")}
                label="Level"
                name="level"
                rules={[{ required: true, message: "Please select a level!" }]}
              >
                <Select style={{width: '88%', marginLeft: '13%'}}>
                  <Option value="N1">N1</Option>
                  <Option value="N2">N2</Option>
                  <Option value="N3">N3</Option>
                  <Option value="N4">N4</Option>
                  <Option value="N5">N5</Option>
                </Select>
              </Form.Item>
              <Form.Item className={cx("card-create__left-content")}
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select style={{width: '88%', marginLeft: '13%'}}>
                  <Option value="JLPT">JLPT</Option>
                  <Option value="Kaiwa">Kaiwa</Option>
                </Select>
              </Form.Item>
              <Form.Item className={cx("card-create__left-content")}
                label="Duration"
                name="duration"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a duration!",
                  },
                  //   {
                  //     min: 0,
                  //     message: "Duration should be greater than 0!",
                  //   },
                ]}
              >
                <InputNumber
                  addonAfter={<Form.Item noStyle>Month</Form.Item>}
                  style={{ width: '96%', marginLeft: '5%' }}
                />
              </Form.Item>
              <Form.Item className={cx("card-create__left-content")}
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a price!",
                  },
                  //   {
                  //     min: 0,
                  //     message: "Price should be greater than 0!",
                  //   },
                ]}
              >
                <InputNumber
                  addonAfter={<Form.Item noStyle>VND</Form.Item>}
                  style={{ width: '89%', marginLeft: '12%' }}
                />
              </Form.Item>
            </Form>
            {/* <div className={cx("card-create__detail")}>
              <input
                type="text"
                placeholder="Course Name"
                required
              />
            </div>
            <div className={cx("card-create__select")}>
              <Form.Item
                label="Level"
                name="level"
                rules={[{ required: true, message: "Please select a level!" }]}
              >
                <Select>
                  <Option value="N1">N1</Option>
                  <Option value="N2">N2</Option>
                  <Option value="N3">N3</Option>
                  <Option value="N4">N4</Option>
                  <Option value="N5">N5</Option>
                </Select>
              </Form.Item>
            </div>
            <div className={cx("card-create__detail")}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input a description!" },
                  {
                    max: 100,
                    message: "Description should be less than 100 characters!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>
            <div className={cx("card-create__detail")}>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a duration!",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={<Form.Item noStyle>Month</Form.Item>}
                  style={{ width: "90%"}}
                />
              </Form.Item>
            </div>
            <div className={cx("card-create__rangeSlider")}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a price!",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={<Form.Item noStyle>VND</Form.Item>}
                  style={{ width: "90%" }}
                />
              </Form.Item>
            </div> */}
          </div>

          <div className={cx("card-create__right")}>
            <img className={cx("card-create__banner")} />
            <div className={cx("card-create__import-file")}>
              <label htmlFor="file">
                <UploadOutlined />
                Choose a file
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
              />
            </div>
          </div>
        </div>
        <Button
          primary
          className={cx("card-create__btn")}
        >
          Create
        </Button>
        <Progress />
      </div>
    </div>
  );
}

export default CreateCourse;

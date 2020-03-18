import React, { Component } from "react";
import { Form, Button, Col, Row, Input, message, Select, Radio, Divider, Card } from "antd";
import DateTime from 'react-datetime';
import { PUT_CAST_URL, POST_CAST_URL } from "../utils/endpoints";
import axios from "axios";
import moment from "moment";
import '../css/datetime.css';

class CastRegistrationFormRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tab: 0,
            cast: {},
            openTime: '',
            closeTime: '',
            startTime: '',
            resultTime: '',
            castType: '',
            castCategory: '',
            castTitle: '',
            externalLinkURL: '',
            externalLinkText: '',
            bettingSectionMessage: '',
            bettingSectionQuestion: '',
            bettingSectionInstructions: '',
            castImage: '',
            castImageView: '',
            castImageText: '선택된 파일 없음',
            maxReward: '',
            totalReward: '',
            minBettingPoints: '',
            marketingCardTitle: '',
            marketingPageUrl: '',
            marketingCardImage: '',
            marketingCardImageText: '선택된 파일 없음',
            marketingCardImageView: '',
            seoPageTitle: '',
            seoDescription: '',
            seoCardImage: '',
            seoCardImageView: '',
            seoCardImageText: '선택된 파일 없음',
            answerType: 'ox',
            answerDetailType: '텍스트',
            correctAnswer: '',
            answerOptions: [],
            answerImages: [],
            ansText1: '',
            ansText2: '',
            ansText3: '',
            ansText4: '',
            ansImg1: '',
            ansImg2: '',
            ansImg3: '',
            ansImg4: '',
            ansImg1View: '',
            ansImg2View: '',
            ansImg3View: '',
            ansImg4View: '',
            ansImg1Text: '파일 선택',
            ansImg2Text: '파일 선택',
            ansImg3Text: '파일 선택',
            ansImg4Text: '파일 선택'
        };
        this.changeTab = this.changeTab.bind(this);
    }

    refresh = formOn => {
        if (formOn === 'add') {
            setTimeout(() => {
                window.location.href = '../cast'
            }, 500);
        } else {
            setTimeout(() => {
                window.location.href = '../cast-card'
            }, 500);
        }
    }


    changeTab(tab) {
        this.setState({ tab });
        console.log(tab);
    }


    handleTextChange = (value, state) => {
        console.log(value);
        this.setState({ [state]: value });
    };

    handleImageChange = (value, state) => {
        console.log(value);
        this.setState({ [state]: value, [state + 'Text']: value.name });
    };

    validDate = (current) => {
        let yesterday = DateTime.moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    }

    handleDateChange = (date, state) => {
        console.log('date --->', moment(date).toISOString());
        this.setState({ [state]: moment(date).toISOString() });
        // let date = moment(date).toISOString();
    };

    cancelForm = formOn => {
        if (formOn === 'add') {
            window.location.href = '../cast';
        } else {
            window.location.href = '../cast-card';
        }
    }

    handleSubmit = () => {
        const token = localStorage.getItem("token");
        let { openTime,
            closeTime,
            startTime,
            resultTime,
            castType,
            castCategory,
            castTitle,
            externalLinkURL,
            externalLinkText,
            bettingSectionQuestion,
            bettingSectionInstructions,
            castImage,
            maxReward,
            totalReward,
            minBettingPoints,
            marketingCardTitle,
            marketingPageUrl,
            marketingCardImage,
            seoPageTitle,
            seoDescription,
            seoCardImage,
            answerOptions,
            answerImages,
            correctAnswer,
            answerType,
            answerDetailType,
            ansText1,
            ansText2,
            ansText3,
            ansText4,
            ansImg1,
            ansImg2,
            ansImg3,
            ansImg4 } = this.state;
        let cast = {
            openTime,
            closeTime,
            startTime,
            resultTime,
            castType,
            category: castCategory,
            title: castTitle,
            externalLinkURL,
            externalLinkText,
            bettingSectionMessage: '기본 질문 : 얼마나 확신하시나요?',
            bettingSectionQuestion,
            bettingSectionInstructions,
            castImage,
            maxReward,
            totalReward,
            minBettingPoints,
            marketingCardTitle,
            marketingPageUrl,
            marketingCardImage,
            seoPageTitle,
            seoDescription,
            seoCardImage,
            answerOptions,
            answerImages,
            castAnswer: Number(correctAnswer),
            answerType,
            answerDetailType
        };
        if (this.props.mode === 'new') {
            if (answerType === 'ox') {
                delete cast.answerImages;
                cast.answerOptions = ['O', 'X'];
            }
            else if (answerDetailType === '텍스트') {
                cast.answerType = '3-choiced';
                delete cast.answerImages;
                cast.answerOptions = [ansText1, ansText2, ansText3];
            } else if (answerDetailType === '그림') {
                cast.answerType = '4-choiced without text';
                delete cast.answerOptions;
                cast.answerImages = [ansImg1, ansImg2, ansImg3, ansImg4];
            } else if (answerDetailType === '그림+텍스트') {
                cast.answerType = '4-choiced with text';
                cast.answerImages = [ansImg1, ansImg2, ansImg3, ansImg4];
                cast.answerOptions = [ansText1, ansText2, ansText3, ansText4];
            }
        }
        else {
            if (answerType === 'ox') {
                delete cast.answerImages;
                cast.answerOptions = ['O', 'X'];
            }
            else if (answerDetailType === '텍스트') {
                cast.answerType = '3-choiced';
                delete cast.answerImages;
                if (ansText1 !== this.props.entry.answerOptions[0] && ansText1 !== '') {
                    cast.answerOptions.push(ansText1);
                    cast.answerOptionsIndex = '0';
                }
                if (ansText2 !== this.props.entry.answerOptions[1] && ansText2 !== '') {
                    cast.answerOptions.push(ansText2);
                    if (cast.answerOptionsIndex !== undefined) {
                        cast.answerOptionsIndex = cast.answerOptionsIndex + ',1'
                    }
                    else {
                        cast.answerOptionsIndex = '1';
                    }
                }
                if (ansText3 !== this.props.entry.answerOptions[2] && ansText3 !== '') {
                    cast.answerOptions.push(ansText3);
                    if (cast.answerOptionsIndex !== undefined) {
                        cast.answerOptionsIndex = cast.answerOptionsIndex + ',2'
                    }
                    else {
                        cast.answerOptionsIndex = '2';
                    }
                }
                if (cast.answerOptions.length === 0) {
                    delete cast.answerOptions;
                }
            } else if (answerDetailType === '그림') {
                cast.answerType = '4-choiced without text';
                delete cast.answerOptions;
                if (ansImg1 !== this.props.entry.answerImages[0] && ansImg1 !== '') {
                    cast.answerImages.push(ansImg1);
                    cast.answerImagesIndex = '0';
                }
                if (ansImg2 !== this.props.entry.answerImages[1] && ansImg2 !== '') {
                    cast.answerImages.push(ansImg2);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',1'
                    }
                    else {
                        cast.answerImagesIndex = '1';
                    }
                }
                if (ansImg3 !== this.props.entry.answerImages[2] && ansImg3 !== '') {
                    cast.answerImages.push(ansImg3);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',2'
                    }
                    else {
                        cast.answerImagesIndex = '2';
                    }
                }
                if (ansImg4 !== this.props.entry.answerImages[3] && ansImg4 !== '') {
                    cast.answerImages.push(ansImg4);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',3'
                    }
                    else {
                        cast.answerImagesIndex = '3';
                    }
                }
                if (cast.answerImages.length === 0) {
                    delete cast.answerImages;
                }
            } else if (answerDetailType === '그림+텍스트') {
                cast.answerType = '4-choiced with text';
                if (ansImg1 !== this.props.entry.answerImages[0] && ansImg1 !== '') {
                    cast.answerImages.push(ansImg1);
                    cast.answerImagesIndex = '0';
                }
                if (ansImg2 !== this.props.entry.answerImages[1] && ansImg2 !== '') {
                    cast.answerImages.push(ansImg2);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',1'
                    }
                    else {
                        cast.answerImagesIndex = '1';
                    }
                }
                if (ansImg3 !== this.props.entry.answerImages[2] && ansImg3 !== '') {
                    cast.answerImages.push(ansImg3);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',2'
                    }
                    else {
                        cast.answerImagesIndex = '2';
                    }
                }
                if (ansImg4 !== this.props.entry.answerImages[3] && ansImg4 !== '') {
                    cast.answerImages.push(ansImg4);
                    if (cast.answerImagesIndex !== undefined) {
                        cast.answerImagesIndex = cast.answerImagesIndex + ',3'
                    }
                    else {
                        cast.answerImagesIndex = '3';
                    }
                }

                if (ansText1 !== this.props.entry.answerOptions[0] && ansText1 !== '') {
                    cast.answerOptions.push(ansText1);
                    cast.answerOptionsIndex = '0';
                }
                if (ansText2 !== this.props.entry.answerOptions[1] && ansText2 !== '') {
                    cast.answerOptions.push(ansText2);
                    if (cast.answerOptionsIndex !== undefined) {
                        cast.answerOptionsIndex = cast.answerOptionsIndex + ',1'
                    }
                    else {
                        cast.answerOptionsIndex = '1';
                    }
                }
                if (ansText3 !== this.props.entry.answerOptions[2] && ansText3 !== '') {
                    cast.answerOptions.push(ansText3);
                    if (cast.answerOptionsIndex !== undefined) {
                        cast.answerOptionsIndex = cast.answerOptionsIndex + ',2'
                    }
                    else {
                        cast.answerOptionsIndex = '2';
                    }
                }
                if (ansText4 !== this.props.entry.answerOptions[3] && ansText4 !== '') {
                    cast.answerOptions.push(ansText4);
                    if (cast.answerOptionsIndex !== undefined) {
                        cast.answerOptionsIndex = cast.answerOptionsIndex + ',3'
                    }
                    else {
                        cast.answerOptionsIndex = '3';
                    }
                }

                if (cast.answerImages.length === 0) {
                    delete cast.answerImages;
                }
                if (cast.answerOptions.length === 0) {
                    delete cast.answerOptions;
                }
            }
        }
        console.log(cast, 'dfjdjkf--->', this.state.ansImg1);

        let formData = new FormData();
        if (cast.openTime !== '') {
            formData.append("openTime", cast.openTime);
        }
        else {
            message.error('Please enter OPEN TIME');
        }
        if (cast.closeTime !== '') {
            formData.append("closeTime", cast.closeTime);
        }
        else {
            message.error('Please enter CLOSE TIME');
        }
        if (cast.startTime !== '') {
            formData.append("startTime", cast.startTime);
        }
        else {
            message.error('Please enter START TIME');
        }
        if (cast.resultTime !== '') {
            formData.append("resultTime", cast.resultTime);
        }
        else {
            message.error('Please enter RESULT TIME');
        }
        if (cast.castType !== '') {
            formData.append("castType", cast.castType);
        }
        else {
            message.error('Please select CAST TYPE');
        }
        if (cast.category !== '') {
            formData.append("category", cast.category);
        }
        else {
            message.error('Please select CAST TAG');
        }
        if (cast.title !== '') {
            formData.append("title", cast.title);
        }
        else {
            message.error('Please enter CAST TITLE');
        }
        if (cast.externalLinkURL !== '') {
            formData.append("externalLinkUrl", cast.externalLinkURL);
        }
        else {
            message.error('Please enter External link URL');
        }
        if (cast.externalLinkText !== '') {
            formData.append("externalLinkText", cast.externalLinkText);
        }
        if (cast.bettingSectionMessage !== '') {
            formData.append("bettingSectionMessage", cast.bettingSectionMessage);
        }
        if (cast.bettingSectionQuestion !== '') {
            formData.append("bettingSectionQuestion", cast.bettingSectionQuestion);
        }
        if (cast.bettingSectionInstructions !== '') {
            formData.append("bettingSectionInstructions", cast.bettingSectionInstructions);
        }
        if (cast.castImage !== '') {
            formData.append("castImage", cast.castImage);
        }
        else if (this.props.mode === 'new') {
            message.error('Please select Cast image');
        }
        if (cast.maxReward !== '') {
            formData.append("maxReward", cast.maxReward);
        }
        else {
            message.error('Please enter maximum reward points');
        }
        if (cast.totalReward !== '') {
            formData.append("totalReward", cast.totalReward);
        }
        else {
            message.error('Please enter total reward points');
        }
        if (cast.minBettingPoints !== '') {
            formData.append("minBettingPoints", cast.minBettingPoints);
        }
        else {
            message.error('Please enter minimum betting points');
        }
        if (cast.marketingCardTitle !== '') {
            formData.append("marketingCardTitle", cast.marketingCardTitle);
        }
        else {
            message.error('Please enter marketing title');
        }
        if (cast.marketingPageUrl !== '') {
            formData.append("marketingPageUrl", cast.marketingPageUrl);
        }
        else {
            message.error('Please enter marketing page URL');
        }
        if (cast.marketingCardImage !== '') {
            formData.append("marketingCardImage", cast.marketingCardImage);
        }
        else if (this.props.mode === 'new') {
            message.error('Please select marketing image');
        }
        if (cast.seoPageTitle !== '') {
            formData.append("seoPageTitle", cast.seoPageTitle);
        }
        else {
            message.error('Please enter page title');
        }
        if (cast.seoDescription !== '') {
            formData.append("seoDescription", cast.seoDescription);
        }
        else {
            message.error('Please enter meta description');
        }
        if (cast.seoCardImage !== '') {
            formData.append("seoCardImage", cast.seoCardImage);
        }
        if (cast.castAnswer !== 0) {
            formData.append("castAnswer", cast.castAnswer);
        }
        else {
            message.error('Please select correct answer');
        }
        if (cast.answerType !== '') {
            formData.append("answerType", cast.answerType);
        }
        if (cast.answerOptionsIndex !== undefined) {
            formData.append("answerOptionsIndex", cast.answerOptionsIndex);
        }
        if (cast.answerImagesIndex !== undefined) {
            formData.append("answerImagesIndex", cast.answerImagesIndex);
        }

        if (cast.answerOptions !== undefined) {
            cast.answerOptions.map(item => {
                formData.append("answerOptions", item);
            })
        }

        if (cast.answerImages !== undefined) {
            cast.answerImages.map(item => {
                formData.append("answerImages", item);
            })
        }

        if (this.props.entry !== undefined) {
            formData.append("castId", this.props.entry._id);
        }

        // console.log(formData.get);

        if (this.props.mode === "new") {
            axios
                .post(
                    POST_CAST_URL,
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                .then(res => {
                    console.log(res);
                    message.success("Cast created successfully!");
                    this.refresh('add');
                })
                .catch(err => {
                    // console.log(err);
                    message.error(err.response);
                });
        } else {
            axios
                .put(
                    PUT_CAST_URL,
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                .then(res => {
                    message.success("Cast updated successfully!");
                    this.refresh('edit');
                })
                .catch(err => {
                    // console.log(err);
                    message.error(err.response);
                });
        }
    };

    async componentWillReceiveProps(props) {
        console.log('props --->', props);

        if (props.mode === 'edit') {
            console.log('title --->', props.entry);
            await this.setState({ castTitle: props.entry.title, castCategory: props.entry.category, castType: props.entry.castType, externalLinkURL: props.entry.externalLinkURL, externalLinkText: props.entry.externalLinkText, bettingSectionMessage: props.entry.bettingSectionMessage, bettingSectionQuestion: props.entry.bettingSectionQuestion, bettingSectionInstructions: props.entry.bettingSectionInstructions, maxReward: props.entry.maxReward, totalReward: props.entry.totalReward, minBettingPoints: props.entry.minBettingPoints, marketingCardTitle: props.entry.marketingCardTitle, marketingPageUrl: props.entry.marketingPageUrl, seoPageTitle: props.entry.seoPageTitle, seoDescription: props.entry.seoDescription, castImageView: props.entry.castImage, marketingCardImageView: props.entry.marketingCardImage, seoCardImageView: props.entry.seoCardImage, correctAnswer: props.entry.castAnswer.toString(), openTime: props.entry.openTime, closeTime: props.entry.closeTime, startTime: props.entry.startTime, resultTime: props.entry.resultTime });

            await this.setState({
                ansImg1Text: 'CHANGE',
                ansImg2Text: 'CHANGE',
                ansImg3Text: 'CHANGE',
                ansImg4Text: 'CHANGE'
            })
            if (props.entry.answerType) {
                if (props.entry.answerType === 'ox') {
                    await this.setState({ answerType: 'ox' });
                }
                else {
                    await this.setState({ answerType: '멀티플' });
                    if (props.entry.answerType === '3-choiced') {
                        await this.setState({ answerDetailType: '텍스트' });
                    }
                    else if (props.entry.answerType === '4-choiced without text') {
                        await this.setState({ answerDetailType: '그림' });
                    }
                    else if (props.entry.answerType === '4-choiced with text') {
                        await this.setState({ answerDetailType: '그림+텍스트' });
                    }
                }

            }

            if (props.entry.answerOptions && props.entry.answerOptions.length > 2) {
                let options = props.entry.answerOptions;
                await this.setState({ ansText1: options[0], ansText2: options[1], ansText3: options[2], ansText4: options[3] });
            }

            if (props.entry.answerImages && props.entry.answerImages.length !== 0) {
                let images = props.entry.answerImages;
                await this.setState({ ansImg1View: images[0], ansImg2View: images[1], ansImg3View: images[2], ansImg4View: images[3] });
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tab } = this.state;
        return (
            <div>
                {(this.props.mode === "new") ? (
                    <Card title="더하다 캐스트 카드" headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
                        <Card>
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="OPEN TIME">
                                            {getFieldDecorator("opentime", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please choose the dateTime"
                                                    }
                                                ]
                                            })(
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    isValidDate={this.validDate}
                                                    name='openTime'
                                                    onChange={(value) => this.handleDateChange(value, 'openTime')}
                                                    value={this.state.openTime}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="CLOSE TIME">
                                            {getFieldDecorator("closetime", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please choose the dateTime"
                                                    }
                                                ]
                                            })(
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    isValidDate={this.validDate}
                                                    onChange={(value) => this.handleDateChange(value, 'closeTime')}
                                                    value={this.state.closeTime}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="START TIME">
                                            {getFieldDecorator("startTime", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please choose the dateTime"
                                                    }
                                                ]
                                            })(
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    isValidDate={this.validDate}
                                                    onChange={(value) => this.handleDateChange(value, 'startTime')}
                                                    value={this.state.startTime}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="RESULT TIME">
                                            {getFieldDecorator("resulttime", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please choose the dateTime"
                                                    }
                                                ]
                                            })(
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    isValidDate={this.validDate}
                                                    onChange={(value) => this.handleDateChange(value, 'resultTime')}
                                                    value={this.state.resultTime}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="CAST TYPE">
                                            {getFieldDecorator("casttype", {
                                                rules: [{ required: true, message: "Please enter title" }]
                                            })(
                                                <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'castType')}>
                                                    <Radio value="top pick"><span style={{ textTransform: 'uppercase' }}>Top Pick</span></Radio>
                                                    <Radio value="normal"><span style={{ textTransform: 'uppercase' }}>Normal</span></Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="CAST TAG">
                                            {getFieldDecorator("tag", {
                                                rules: [{ required: true, message: "Please enter tag" }]
                                            })(
                                                <Select
                                                    placeholder="태그를 선택"
                                                    value={this.state.castCategory}
                                                    onChange={value =>
                                                        this.handleTextChange(value, 'castCategory')
                                                    }
                                                >
                                                    <Select.Option value="web_series">
                                                        Web Series
                                                </Select.Option>
                                                    <Select.Option value="fun">
                                                        Fun
                                                </Select.Option>
                                                    <Select.Option value="entertainment">
                                                        Entertainment
                                                </Select.Option>
                                                    <Select.Option value="music">
                                                        Music
                                                </Select.Option>
                                                    <Select.Option value="popular">
                                                        Popular
                                                </Select.Option>
                                                    <Select.Option value="sports">
                                                        Sports
                                                </Select.Option>
                                                    <Select.Option value="beauty">
                                                        Beauty
                                                </Select.Option>
                                                    <Select.Option value="events">
                                                        Events
                                                </Select.Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="카드 제목">
                                            <Input
                                                placeholder="제목 입력"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'castTitle')}
                                                name="title"
                                                value={this.state.castTitle}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="외부 링크(http:// 또는 https://로 시작하는 유효한 WEB URL 이어야 합니다.">
                                            <Input
                                                placeholder="외부 링크"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'externalLinkURL')}
                                                name="externalLink"
                                                value={this.state.externalLinkURL}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="외부 링크 텍스트 ( 공란으로 두시면 더 많은 힌트 보러가기 등록됩니다.)">
                                            <Input
                                                placeholder="링크 텍스트"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'externalLinkText')}
                                                name="externalLinkText"
                                                value={this.state.externalLinkText}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="배팅 메세지 ( 기본 질문 : 얼마나 확신하시나요?)">
                                            <Input
                                                placeholder="배팅 질문"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'bettingSectionQuestion')}
                                                name="bettingQues"
                                                value={this.state.bettingSectionQuestion}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Input
                                                placeholder="배팅 안내"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'bettingSectionInstructions')}
                                                name="bettingGuide"
                                                value={this.state.bettingSectionInstructions}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="메인 이미지">
                                            {getFieldDecorator("selectImg", {
                                                rules: [{ required: true, message: "Please enter file name" }]
                                            })(
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'castImage')}
                                                        type="file"
                                                        name="castImage"
                                                        id="castImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.castImage}
                                                    />
                                                    <label htmlFor='castImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.castImageText}</label>
                                                </div>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ padding: '1.5rem' }}>
                                        <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            {(this.state.castImage !== '') ? <img src={(this.state.castImage !== '') ? URL.createObjectURL(this.state.castImage) : ''} alt='cast_image' style={{ height: '100%', width: '101%' }} /> : <span>No Image</span>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="캐스트 답변 타입">
                                            <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'answerType')} value={this.state.answerType}>
                                                <Radio value="ox">OX</Radio>
                                                <Radio value="멀티플">멀티플</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        {(this.state.answerType !== 'ox') ?
                                            <Form.Item label="상세 타입">
                                                <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'answerDetailType')} value={this.state.answerDetailType}>
                                                    <Radio selected={tab === 0} value="텍스트" onClick={() => this.changeTab(0)}>텍스트</Radio>
                                                    <Radio selected={tab === 1} value="그림" onClick={() => this.changeTab(1)}>그림</Radio>
                                                    <Radio selected={tab === 2} value="그림+텍스트" onClick={() => this.changeTab(2)}>그림+텍스트</Radio>
                                                </Radio.Group>
                                            </Form.Item> :
                                            <Form.Item label="캐스트 정답">
                                                {getFieldDecorator("correctAnswer", {
                                                    rules: [{ required: true, message: "Please enter correct answer" }]
                                                })(
                                                    <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')}>
                                                        <Radio selected={tab === 0} value='1' onClick={() => this.changeTab(0)}>O</Radio>
                                                        <Radio selected={tab === 1} value="2" onClick={() => this.changeTab(1)}>X</Radio>
                                                    </Radio.Group>,
                                                )}
                                            </Form.Item>}
                                    </Col>
                                </Row>
                                {(this.state.answerType !== 'ox') ? <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="캐스트 정답">
                                            {getFieldDecorator("correctAnswer", {
                                                rules: [{ required: true, message: "Please enter correct answer" }]
                                            })(
                                                <div>
                                                    {this.state.answerDetailType === '텍스트' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24} style={{ marginBottom: '0.5rem' }}>
                                                                <Col span={10}>
                                                                    <Radio value="1"><Input
                                                                        placeholder="글자수 최대 16자 제한"
                                                                        onChange={e => this.handleTextChange(e.target.value, 'ansText1')}
                                                                        name="ansText1"
                                                                        multiple
                                                                        value={this.state.ansText1}
                                                                    /></Radio>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Radio value="2">
                                                                        <Input
                                                                            placeholder="글자수 최대 16자 제한"
                                                                            onChange={e => this.handleTextChange(e.target.value, 'ansText2')}
                                                                            name="ansText2"
                                                                            multiple
                                                                            value={this.state.ansText2}
                                                                        />
                                                                    </Radio>
                                                                </Col>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Radio value="3">
                                                                    <Input
                                                                        placeholder="글자수 최대 16자 제한"
                                                                        onChange={e => this.handleTextChange(e.target.value, 'ansText3')}
                                                                        name="ansText3"
                                                                        multiple
                                                                        value={this.state.ansText3}
                                                                    />
                                                                </Radio>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                    {this.state.answerDetailType === '그림' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="1"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 1 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg1')}
                                                                                    type="file"
                                                                                    name="ansImg1"
                                                                                    id='ansImg1'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg1}
                                                                                />
                                                                                {(this.state.ansImg1 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg1)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg1' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg1Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="2"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 2 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg2')}
                                                                                    type="file"
                                                                                    name="ansImg2"
                                                                                    id='ansImg2'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg2}
                                                                                />
                                                                                {(this.state.ansImg2 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg2)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg2' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg2Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>

                                                            <Col span={24} style={{ marginTop: '0.5rem' }}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="3"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 3 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg3')}
                                                                                    type="file"
                                                                                    name="ansImg3"
                                                                                    id='ansImg3'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg3}
                                                                                />
                                                                                {(this.state.ansImg3 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg3)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg3' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg3Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="4"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 4 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg4')}
                                                                                    type="file"
                                                                                    name="ansImg4"
                                                                                    id='ansImg4'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg4}
                                                                                />
                                                                                {(this.state.ansImg4 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg4)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg4' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg4Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                    {this.state.answerDetailType === '그림+텍스트' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="1"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 1 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg1')}
                                                                                    type="file"
                                                                                    name="ansImg1"
                                                                                    id='ansImg1'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg1}
                                                                                />
                                                                                {(this.state.ansImg1 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg1)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg1' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg1Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText1')}
                                                                                name="ansText1"
                                                                                multiple
                                                                                value={this.state.ansText1}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="2"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 2 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg2')}
                                                                                    type="file"
                                                                                    name="ansImg2"
                                                                                    id='ansImg2'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg2}
                                                                                />
                                                                                {(this.state.ansImg2 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg2)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg2' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg2Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText2')}
                                                                                name="ansText2"
                                                                                multiple
                                                                                value={this.state.ansText2}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>

                                                            <Col span={24} style={{ marginTop: '0.5rem' }}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="3"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 3 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg3')}
                                                                                    type="file"
                                                                                    name="ansImg3"
                                                                                    id='ansImg3'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg3}
                                                                                />
                                                                                {(this.state.ansImg3 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg3)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg3' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg3Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText3')}
                                                                                name="ansText3"
                                                                                multiple
                                                                                value={this.state.ansText3}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="4"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 4 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg4')}
                                                                                    type="file"
                                                                                    name="ansImg4"
                                                                                    id='ansImg4'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg4}
                                                                                />
                                                                                {(this.state.ansImg4 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg4)} alt='ans_image' /> : ''}
                                                                                <label htmlFor='ansImg4' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg4Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText4')}
                                                                                name="ansText4"
                                                                                multiple
                                                                                value={this.state.ansText4}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                </div>


                                            )}
                                        </Form.Item>

                                    </Col>
                                </Row> : ''}
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="최대 보상가능 금액">
                                            <Input
                                                placeholder="숫자 입력 (사용자가 받을 수 있는 최대 금액)"
                                                onChange={(e) => this.handleTextChange(Number(e.target.value), 'maxReward')}
                                                name="maxReward"
                                                value={this.state.maxReward}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="총 상금 금액">
                                            <Input
                                                placeholder="숫자 입력 ( 퀴즈의 총 보상금액)"
                                                onChange={(e) => this.handleTextChange(Number(e.target.value), 'totalReward')}
                                                name="totalReward"
                                                value={this.state.totalReward}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="최소 베팅 금액">
                                            <Input
                                                placeholder="숫자 입력 (베팅 할 수 있는 최소 금액)"
                                                onChange={(e) => this.handleTextChange(Number(e.target.value), 'minBettingPoints')}
                                                name="minBettingPoints"
                                                value={this.state.minBettingPoints}
                                            />
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={16}>
                                    <h2>마케팅카드 영역 설정</h2>
                                    <Col span={12}>
                                        <Form.Item label="타이틀 입력">
                                            <Input
                                                placeholder="텍스트 입력"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'marketingCardTitle')}
                                                name="marketingCardTitle"
                                                value={this.state.marketingCardTitle}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="외부링크">
                                            <Input
                                                placeholder="URL 입력"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'marketingPageUrl')}
                                                name="marketingPageUrl"
                                                value={this.state.marketingPageUrl}
                                            />
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="메인 이미지">
                                            {getFieldDecorator("marketingImg", {
                                                rules: [{ required: true, message: "Please enter file name" }]
                                            })(
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'marketingCardImage')}
                                                        type="file"
                                                        name="marketingCardImage"
                                                        id="marketingCardImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.marketingCardImage}
                                                    />
                                                    <label htmlFor='marketingCardImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.marketingCardImageText}</label>
                                                </div>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ padding: '1.5rem' }}>
                                        <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            {(this.state.marketingCardImage !== '') ? <img src={(this.state.marketingCardImage !== '') ? URL.createObjectURL(this.state.marketingCardImage) : ''} style={{ height: '100%', width: '101%' }} alt='marketing_image' /> : <span>No Image</span>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <h2>노출 설정</h2>
                                    <Col span={12}>
                                        <Form.Item label="Page Title">
                                            <Input
                                                placeholder="제목 입력"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'seoPageTitle')}
                                                name="seoPageTitle"
                                                value={this.state.seoPageTitle}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Meta description">
                                            <Input
                                                placeholder="텍스트 입력"
                                                onChange={(e) => this.handleTextChange(e.target.value, 'seoDescription')}
                                                name="seoDescription"
                                                value={this.state.seoDescription}
                                            />
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="메인 이미지">
                                            {getFieldDecorator("exposureImg", {
                                                rules: [{ required: true, message: "Please enter file name" }]
                                            })(
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'seoCardImage')}
                                                        type="file"
                                                        name="seoCardImage"
                                                        id="seoCardImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.seoCardImage}
                                                    />
                                                    <label htmlFor='seoCardImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.seoCardImageText}</label>
                                                </div>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ padding: '1.5rem' }}>
                                        <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            {(this.state.seoCardImage !== '') ? <img src={(this.state.seoCardImage !== '') ? URL.createObjectURL(this.state.seoCardImage) : ''} style={{ height: '100%', width: '101%' }} alt='seo_image' /> : <span>No Image</span>}
                                        </div>
                                    </Col>
                                </Row>
                            </Form>

                        </Card>
                        <div
                            style={{
                                // position: "absolute",
                                left: 0,
                                bottom: 0,
                                width: "100%",
                                borderTop: "1px solid #e9e9e9",
                                padding: "10px 16px",
                                background: "transparent",
                                textAlign: "right"
                            }}
                        >
                            <Button onClick={() => this.cancelForm('add')} style={{ marginRight: 8, padding: '0 53.25px' }} className='btn-clickable'>
                                취소
              </Button>
                            <Divider type="vertical" />
                            <Button onClick={this.handleSubmit} type="primary" className='btn-clickable'>
                                등록하기
              </Button>
                        </div>
                    </Card>
                ) : (
                        <Card title={`캐스트 수정 ${this.state.castTitle}`} headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
                            <Card>
                                <Form layout="vertical" hideRequiredMark>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="OPEN TIME">
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    name='openTime'
                                                    onChange={(value) => this.handleDateChange(value, 'openTime')}
                                                    value={moment(this.state.openTime)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="CLOSE TIME">
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    onChange={(value) => this.handleDateChange(value, 'closeTime')}
                                                    value={moment(this.state.closeTime)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="START TIME">
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    onChange={(value) => this.handleDateChange(value, 'startTime')}
                                                    value={moment(this.state.startTime)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="RESULT TIME">
                                                <DateTime
                                                    style={{ width: "100%" }}
                                                    onChange={(value) => this.handleDateChange(value, 'resultTime')}
                                                    value={moment(this.state.resultTime)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="CAST TYPE">
                                                <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'castType')} value={this.state.castType}>
                                                    <Radio value="top pick">Top Pick</Radio>
                                                    <Radio value="normal">Normal</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="CAST TAG">

                                                <Select
                                                    placeholder="태그를 선택"
                                                    value={this.state.castCategory}
                                                    onChange={value =>
                                                        this.handleTextChange(value, 'castCategory')
                                                    }
                                                >
                                                    <Select.Option value="web_series">
                                                        Web Series
                                                </Select.Option>
                                                    <Select.Option value="fun">
                                                        Fun
                                                </Select.Option>
                                                    <Select.Option value="entertainment">
                                                        Entertainment
                                                </Select.Option>
                                                    <Select.Option value="music">
                                                        Music
                                                </Select.Option>
                                                    <Select.Option value="popular">
                                                        Popular
                                                </Select.Option>
                                                    <Select.Option value="sports">
                                                        Sports
                                                </Select.Option>
                                                    <Select.Option value="beauty">
                                                        Beauty
                                                </Select.Option>
                                                    <Select.Option value="events">
                                                        Events
                                                </Select.Option>
                                                </Select>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            {console.log('titleInRender --->', this.state.castTitle)}
                                            <Form.Item label="카드 제목">
                                                <Input
                                                    placeholder="Please enter card title"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'castTitle')}
                                                    name="title"
                                                    value={this.state.castTitle}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item label="외부 링크(http:// 또는 https://로 시작하는 유효한 WEB URL 이어야 합니다.">
                                                <Input
                                                    placeholder="Please enter External link"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'externalLinkURL')}
                                                    name="externalLink"
                                                    value={this.state.externalLinkURL}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item label="외부 링크 텍스트 ( 공란으로 두시면 더 많은 힌트 보러가기 등록됩니다.)">
                                                <Input
                                                    placeholder="Please enter external link"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'externalLinkText')}
                                                    name="externalLinkText"
                                                    value={this.state.externalLinkText}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item label="배팅 메세지 ( 기본 질문 : 얼마나 확신하시나요?)">
                                                <Input
                                                    placeholder="배팅 질문"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'bettingSectionQuestion')}
                                                    name="bettingQues"
                                                    value={this.state.bettingSectionQuestion}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Input
                                                    placeholder="배팅 안내"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'bettingSectionInstructions')}
                                                    name="bettingGuide"
                                                    value={this.state.bettingSectionInstructions}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="메인 이미지">
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'castImage')}
                                                        type="file"
                                                        name="castImage"
                                                        id="castImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.castImage}
                                                    />
                                                    <label htmlFor='castImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.castImageText}</label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ padding: '1.5rem' }}>
                                            <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                {(this.state.castImage !== '') ? <img src={(this.state.castImage !== '') ? URL.createObjectURL(this.state.castImage) : ''} style={{ height: '100%', width: '101%' }} alt='cast_image' /> : <img src={(this.state.castImageView !== '') ? this.state.castImageView : ''} style={{ height: '100%', width: '101%' }} alt='cast_image' />}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="캐스트 답변 타입">
                                                <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'answerType')} value={this.state.answerType}>
                                                    <Radio value="ox">OX</Radio>
                                                    <Radio value="멀티플">멀티플</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            {(this.state.answerType !== 'ox') ?
                                                <Form.Item label="상세 타입">
                                                    <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'answerDetailType')} value={this.state.answerDetailType}>
                                                        <Radio selected={tab === 0} value="텍스트" onClick={() => this.changeTab(0)}>텍스트</Radio>
                                                        <Radio selected={tab === 1} value="그림" onClick={() => this.changeTab(1)}>그림</Radio>
                                                        <Radio selected={tab === 2} value="그림+텍스트" onClick={() => this.changeTab(2)}>그림+텍스트</Radio>
                                                    </Radio.Group>
                                                </Form.Item> :
                                                <Form.Item label="캐스트 정답">
                                                    <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                        <Radio selected={tab === 0} value='1' onClick={() => this.changeTab(0)}>O</Radio>
                                                        <Radio selected={tab === 1} value="2" onClick={() => this.changeTab(1)}>X</Radio>
                                                    </Radio.Group>
                                                </Form.Item>}
                                        </Col>
                                    </Row>
                                    {(this.state.answerType !== 'ox') ? <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item label="캐스트 정답">

                                                <div>
                                                    {this.state.answerDetailType === '텍스트' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24} style={{ marginBottom: '0.5rem' }}>
                                                                <Col span={10}>
                                                                    <Radio value="1"><Input
                                                                        placeholder="글자수 최대 16자 제한"
                                                                        onChange={e => this.handleTextChange(e.target.value, 'ansText1')}
                                                                        name="ansText1"
                                                                        multiple
                                                                        value={this.state.ansText1}
                                                                    /></Radio>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Radio value="2">
                                                                        <Input
                                                                            placeholder="글자수 최대 16자 제한"
                                                                            onChange={e => this.handleTextChange(e.target.value, 'ansText2')}
                                                                            name="ansText2"
                                                                            multiple
                                                                            value={this.state.ansText2}
                                                                        />
                                                                    </Radio>
                                                                </Col>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Radio value="3">
                                                                    <Input
                                                                        placeholder="글자수 최대 16자 제한"
                                                                        onChange={e => this.handleTextChange(e.target.value, 'ansText3')}
                                                                        name="ansText3"
                                                                        multiple
                                                                        value={this.state.ansText3}
                                                                    />
                                                                </Radio>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                    {this.state.answerDetailType === '그림' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="1"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 1 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg1')}
                                                                                    type="file"
                                                                                    name="ansImg1"
                                                                                    id='ansImg1'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg1}
                                                                                />
                                                                                {(this.state.ansImg1 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg1)} alt='ans_image' /> : <img src={this.state.ansImg1View} style={{ height: '100%', width: '100%' }} alt='ans_image' />}
                                                                                <label htmlFor='ansImg1' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg1Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="2"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 2 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg2')}
                                                                                    type="file"
                                                                                    name="ansImg2"
                                                                                    id='ansImg2'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg2}
                                                                                />
                                                                                {(this.state.ansImg2 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg2)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg2View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg2' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg2Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>

                                                            <Col span={24} style={{ marginTop: '0.5rem' }}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="3"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 3 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg3')}
                                                                                    type="file"
                                                                                    name="ansImg3"
                                                                                    id='ansImg3'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg3}
                                                                                />
                                                                                {(this.state.ansImg3 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg3)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg3View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg3' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg3Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="4"></Radio></Col>
                                                                        <Col span={20}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 4 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg4')}
                                                                                    type="file"
                                                                                    name="ansImg4"
                                                                                    id='ansImg4'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg4}
                                                                                />
                                                                                {(this.state.ansImg4 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg4)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg4View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg4' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg4Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                    {this.state.answerDetailType === '그림+텍스트' && (
                                                        <Radio.Group onChange={e => this.handleTextChange(e.target.value, 'correctAnswer')} value={this.state.correctAnswer}>
                                                            <Col span={24}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="1"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 1 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg1')}
                                                                                    type="file"
                                                                                    name="ansImg1"
                                                                                    id='ansImg1'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg1}
                                                                                />
                                                                                {(this.state.ansImg1 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg1)} alt='ans_image' /> : <img src={this.state.ansImg1View} style={{ height: '100%', width: '100%' }} alt='ans_image' />}
                                                                                <label htmlFor='ansImg1' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg1Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText1')}
                                                                                name="ansText1"
                                                                                multiple
                                                                                value={this.state.ansText1}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="2"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 2 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg2')}
                                                                                    type="file"
                                                                                    name="ansImg2"
                                                                                    id='ansImg2'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg2}
                                                                                />
                                                                                {(this.state.ansImg2 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg2)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg2View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg2' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg2Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText2')}
                                                                                name="ansText2"
                                                                                multiple
                                                                                value={this.state.ansText2}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>

                                                            <Col span={24} style={{ marginTop: '0.5rem' }}>
                                                                <Col span={12}>
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="3"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 3 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg3')}
                                                                                    type="file"
                                                                                    name="ansImg3"
                                                                                    id='ansImg3'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg3}
                                                                                />
                                                                                {(this.state.ansImg3 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg3)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg3View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg3' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg3Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText3')}
                                                                                name="ansText3"
                                                                                multiple
                                                                                value={this.state.ansText3}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col span={12} >
                                                                    <Row gutter={8}>
                                                                        <Col span={2}><Radio value="4"></Radio></Col>
                                                                        <Col span={20} style={{ marginBottom: '0.5rem' }}>
                                                                            <div style={{ height: '100px', width: '100px', border: '1px solid lightgrey', borderRadius: '4px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <Input
                                                                                    placeholder="Answer 4 Image"
                                                                                    onChange={(e) => this.handleImageChange(e.target.files[0], 'ansImg4')}
                                                                                    type="file"
                                                                                    name="ansImg4"
                                                                                    id='ansImg4'
                                                                                    multiple
                                                                                    style={{ display: 'none' }}
                                                                                // value={this.state.ansImg4}
                                                                                />
                                                                                {(this.state.ansImg4 !== '') ? <img style={{ height: '100%', width: '100%' }} src={URL.createObjectURL(this.state.ansImg4)} alt='ans_image' /> : <img style={{ height: '100%', width: '100%' }} src={this.state.ansImg4View} alt='ans_image' />}
                                                                                <label htmlFor='ansImg4' style={{ padding: '5px', border: '2px solid lightgrey', borderRadius: '25px', position: 'absolute', top: '35%', background: 'white' }}>{this.state.ansImg4Text}</label>
                                                                            </div>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Input
                                                                                placeholder="글자수 최대 16자 제한"
                                                                                onChange={e => this.handleTextChange(e.target.value, 'ansText4')}
                                                                                name="ansText4"
                                                                                multiple
                                                                                value={this.state.ansText4}
                                                                                style={{ width: '200px' }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Col>
                                                        </Radio.Group>
                                                    )}
                                                </div>
                                            </Form.Item>

                                        </Col>
                                    </Row> : ''}
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="최대 보상가능 금액">
                                                <Input
                                                    placeholder="숫자 입력 (사용자가 받을 수 있는 최대 금액)"
                                                    onChange={(e) => this.handleTextChange(Number(e.target.value), 'maxReward')}
                                                    name="maxReward"
                                                    value={this.state.maxReward}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="총 상금 금액">
                                                <Input
                                                    placeholder="숫자 입력 ( 퀴즈의 총 보상금액)"
                                                    onChange={(e) => this.handleTextChange(Number(e.target.value), 'totalReward')}
                                                    name="totalReward"
                                                    value={this.state.totalReward}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="최소 베팅 금액">
                                                <Input
                                                    placeholder="숫자 입력 (베팅 할 수 있는 최소 금액)"
                                                    onChange={(e) => this.handleTextChange(Number(e.target.value), 'minBettingPoints')}
                                                    name="minBettingPoints"
                                                    value={this.state.minBettingPoints}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={16}>
                                        <h2>마케팅카드 영역 설정</h2>
                                        <Col span={12}>
                                            <Form.Item label="타이틀 입력">
                                                <Input
                                                    placeholder="텍스트 입력"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'marketingCardTitle')}
                                                    name="marketingCardTitle"
                                                    value={this.state.marketingCardTitle}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="외부링크">
                                                <Input
                                                    placeholder="URL 입력"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'marketingPageUrl')}
                                                    name="marketingPageUrl"
                                                    value={this.state.marketingPageUrl}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="메인 이미지">
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'marketingCardImage')}
                                                        type="file"
                                                        name="marketingCardImage"
                                                        id="marketingCardImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.marketingCardImage}
                                                    />
                                                    <label htmlFor='marketingCardImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.marketingCardImageText}</label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ padding: '1.5rem' }}>
                                            <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                {(this.state.marketingCardImage !== '') ? <img src={(this.state.marketingCardImage !== '') ? URL.createObjectURL(this.state.marketingCardImage) : ''} style={{ height: '100%', width: '101%' }} alt='marketing_image' /> : <img src={(this.state.marketingCardImageView !== '') ? this.state.marketingCardImageView : ''} style={{ height: '100%', width: '101%' }} alt='marketing_image' />}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <h2>노출 설정</h2>
                                        <Col span={12}>
                                            <Form.Item label="Page Title">
                                                <Input
                                                    placeholder="제목 입력"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'seoPageTitle')}
                                                    name="seoPageTitle"
                                                    value={this.state.seoPageTitle}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Meta description">
                                                <Input
                                                    placeholder="텍스트 입력"
                                                    onChange={(e) => this.handleTextChange(e.target.value, 'seoDescription')}
                                                    name="seoDescription"
                                                    value={this.state.seoDescription}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="메인 이미지">
                                                <div style={{ border: '1px solid lightgrey', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                                                    <Input
                                                        placeholder="Please enter betting guide"
                                                        onChange={(e) => this.handleImageChange(e.target.files[0], 'seoCardImage')}
                                                        type="file"
                                                        name="seoCardImage"
                                                        id="seoCardImage"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    // value={this.state.seoCardImage}
                                                    />
                                                    <label htmlFor='seoCardImage' style={{ border: '1px solid lightgrey', padding: '5px', borderRadius: '4px', background: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>파일 선택</label>
                                                    <label style={{ marginLeft: '0.5rem' }}>{this.state.seoCardImageText}</label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ padding: '1.5rem' }}>
                                            <div style={{ height: '100px', width: '100px', border: '0.05px solid lightgrey', boxSizing: 'border-box', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                {(this.state.seoCardImage !== '') ? <img src={(this.state.seoCardImage !== '') ? URL.createObjectURL(this.state.seoCardImage) : ''} style={{ height: '100%', width: '101%' }} alt='seo_image' /> : <img src={(this.state.seoCardImageView !== '') ? this.state.seoCardImageView : ''} style={{ height: '100%', width: '101%' }} alt='seo_image' />}
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                            <div
                                style={{
                                    // position: "absolute",
                                    left: 0,
                                    bottom: 0,
                                    width: "100%",
                                    borderTop: "1px solid #e9e9e9",
                                    padding: "10px 16px",
                                    background: "transparent",
                                    textAlign: "right"
                                }}
                            >
                                <Button onClick={() => this.cancelForm('edit')} style={{ marginRight: 8, padding: '0 53.25px' }} className='btn-clickable'>
                                    취소
              </Button>
                                <Divider type="vertical" />
                                <Button onClick={this.handleSubmit} type="primary" className='btn-clickable'>
                                    등록하기
              </Button>
                            </div>
                        </Card>
                    )
                }
            </div>
        );
    }
}

const CastRegistrationForm = Form.create()(CastRegistrationFormRaw);
export default CastRegistrationForm;

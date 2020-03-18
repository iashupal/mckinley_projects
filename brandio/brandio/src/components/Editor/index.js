import "../../assets/css/editor.css";

import React, { Component, Fragment } from "react";
import Display from "../Display";
import garment from "../dummy/garments";
import { fabric } from "fabric";
import html2canvas from "html2canvas";
import RightBar from "../RightBar";
import ContentSelector from "../ContentSelector";
import axios from "axios";
import {
    collaborationAPI,
    itemAPI,
    commmonAPI,
    customAPI,
    individualAPI,
    illustrationAPI,
    cartAPI
} from "../../services/ApiService";
import { withRouter } from "react-router-dom";
import Loader from "../../screens/Loader";
import {
    message,
    Modal,
    Input,
    Icon,
    Empty,
    Upload,
    Menu,
    Dropdown,
    Button,
    Divider,
    Tooltip,
    Progress,
    Skeleton
} from "antd";
import ClipLoader from "react-spinners/ClimbingBoxLoader";
import GridLoader from "react-spinners/BarLoader";
import ReactMarkdown from "react-markdown";
import _ from "lodash";
import HeaderContext from "../../context/HeaderContext";
import CurrencyFormat from "react-currency-format";
import ImgFailed from "../ImgFailed";

function clipByName(ctx, canvas) {
    this.setCoords();
    var clipRect = canvas
        .getObjects()
        .filter(obj => obj.clipFor === this.clipName)[0];
    console.log(clipRect);
    var scaleXTo1 = 1 / this.scaleX;
    var scaleYTo1 = 1 / this.scaleY;
    ctx.save();

    var ctxLeft = -(this.width / 2) + clipRect.strokeWidth;
    var ctxTop = -(this.height / 2) + clipRect.strokeWidth;
    var ctxWidth = clipRect.width - clipRect.strokeWidth;
    var ctxHeight = clipRect.height - clipRect.strokeWidth;

    ctx.translate(ctxLeft, ctxTop);
    ctx.scale(scaleXTo1, scaleYTo1);
    ctx.rotate(degToRad(this.angle * -1));

    ctx.beginPath();
    ctx.rect(
        clipRect.left - this.oCoords.tl.x,
        clipRect.top - this.oCoords.tl.y,
        clipRect.width,
        clipRect.height
    );
    ctx.closePath();
    ctx.restore();
}

function initAligningGuidelines(canvas) {
    var ctx = canvas.getSelectionContext(),
        aligningLineOffset = 5,
        aligningLineMargin = 4,
        aligningLineWidth = 1,
        aligningLineColor = "red",
        viewportTransform,
        zoom = 1;

    function drawVerticalLine(coords) {
        drawLine(
            coords.x + 0.5,
            coords.y1 > coords.y2 ? coords.y2 : coords.y1,
            coords.x + 0.5,
            coords.y2 > coords.y1 ? coords.y2 : coords.y1
        );
    }

    function drawHorizontalLine(coords) {
        drawLine(
            coords.x1 > coords.x2 ? coords.x2 : coords.x1,
            coords.y + 0.5,
            coords.x2 > coords.x1 ? coords.x2 : coords.x1,
            coords.y + 0.5
        );
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.save();
        ctx.lineWidth = aligningLineWidth;
        ctx.strokeStyle = aligningLineColor;
        ctx.beginPath();
        ctx.moveTo(
            (x1 + viewportTransform[4]) * zoom,
            (y1 + viewportTransform[5]) * zoom
        );
        ctx.lineTo(
            (x2 + viewportTransform[4]) * zoom,
            (y2 + viewportTransform[5]) * zoom
        );
        ctx.stroke();
        ctx.restore();
    }

    function isInRange(value1, value2) {
        value1 = Math.round(value1);
        value2 = Math.round(value2);
        for (
            var i = value1 - aligningLineMargin,
            len = value1 + aligningLineMargin;
            i <= len;
            i++
        ) {
            if (i === value2) {
                return true;
            }
        }
        return false;
    }

    var verticalLines = [],
        horizontalLines = [];

    canvas.on("mouse:down", function () {
        viewportTransform = canvas.viewportTransform;
        zoom = canvas.getZoom();
    });

    canvas.on("object:moving", function (e) {
        var activeObject = e.target,
            canvasObjects = canvas.getObjects(),
            activeObjectCenter = activeObject.getCenterPoint(),
            activeObjectLeft = activeObjectCenter.x,
            activeObjectTop = activeObjectCenter.y,
            activeObjectBoundingRect = activeObject.getBoundingRect(),
            activeObjectHeight =
                activeObjectBoundingRect.height / viewportTransform[3],
            activeObjectWidth =
                activeObjectBoundingRect.width / viewportTransform[0],
            horizontalInTheRange = false,
            verticalInTheRange = false,
            transform = canvas._currentTransform;

        if (!transform) return;

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        for (var i = canvasObjects.length; i--;) {
            if (canvasObjects[i] === activeObject) continue;

            var objectCenter = canvasObjects[i].getCenterPoint(),
                objectLeft = objectCenter.x,
                objectTop = objectCenter.y,
                objectBoundingRect = canvasObjects[i].getBoundingRect(),
                objectHeight = objectBoundingRect.height / viewportTransform[3],
                objectWidth = objectBoundingRect.width / viewportTransform[0];

            // snap by the horizontal center line
            if (isInRange(objectLeft, activeObjectLeft)) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft,
                    y1:
                        objectTop < activeObjectTop
                            ? objectTop - objectHeight / 2 - aligningLineOffset
                            : objectTop + objectHeight / 2 + aligningLineOffset,
                    y2:
                        activeObjectTop > objectTop
                            ? activeObjectTop +
                            activeObjectHeight / 2 +
                            aligningLineOffset
                            : activeObjectTop -
                            activeObjectHeight / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(objectLeft, activeObjectTop),
                    "center",
                    "center"
                );
            }

            // snap by the left edge
            if (
                isInRange(
                    objectLeft - objectWidth / 2,
                    activeObjectLeft - activeObjectWidth / 2
                )
            ) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft - objectWidth / 2,
                    y1:
                        objectTop < activeObjectTop
                            ? objectTop - objectHeight / 2 - aligningLineOffset
                            : objectTop + objectHeight / 2 + aligningLineOffset,
                    y2:
                        activeObjectTop > objectTop
                            ? activeObjectTop +
                            activeObjectHeight / 2 +
                            aligningLineOffset
                            : activeObjectTop -
                            activeObjectHeight / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(
                        objectLeft - objectWidth / 2 + activeObjectWidth / 2,
                        activeObjectTop
                    ),
                    "center",
                    "center"
                );
            }

            // snap by the right edge
            if (
                isInRange(
                    objectLeft + objectWidth / 2,
                    activeObjectLeft + activeObjectWidth / 2
                )
            ) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft + objectWidth / 2,
                    y1:
                        objectTop < activeObjectTop
                            ? objectTop - objectHeight / 2 - aligningLineOffset
                            : objectTop + objectHeight / 2 + aligningLineOffset,
                    y2:
                        activeObjectTop > objectTop
                            ? activeObjectTop +
                            activeObjectHeight / 2 +
                            aligningLineOffset
                            : activeObjectTop -
                            activeObjectHeight / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(
                        objectLeft + objectWidth / 2 - activeObjectWidth / 2,
                        activeObjectTop
                    ),
                    "center",
                    "center"
                );
            }

            // snap by the vertical center line
            if (isInRange(objectTop, activeObjectTop)) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop,
                    x1:
                        objectLeft < activeObjectLeft
                            ? objectLeft - objectWidth / 2 - aligningLineOffset
                            : objectLeft + objectWidth / 2 + aligningLineOffset,
                    x2:
                        activeObjectLeft > objectLeft
                            ? activeObjectLeft +
                            activeObjectWidth / 2 +
                            aligningLineOffset
                            : activeObjectLeft -
                            activeObjectWidth / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(activeObjectLeft, objectTop),
                    "center",
                    "center"
                );
            }

            // snap by the top edge
            if (
                isInRange(
                    objectTop - objectHeight / 2,
                    activeObjectTop - activeObjectHeight / 2
                )
            ) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop - objectHeight / 2,
                    x1:
                        objectLeft < activeObjectLeft
                            ? objectLeft - objectWidth / 2 - aligningLineOffset
                            : objectLeft + objectWidth / 2 + aligningLineOffset,
                    x2:
                        activeObjectLeft > objectLeft
                            ? activeObjectLeft +
                            activeObjectWidth / 2 +
                            aligningLineOffset
                            : activeObjectLeft -
                            activeObjectWidth / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(
                        activeObjectLeft,
                        objectTop - objectHeight / 2 + activeObjectHeight / 2
                    ),
                    "center",
                    "center"
                );
            }

            // snap by the bottom edge
            if (
                isInRange(
                    objectTop + objectHeight / 2,
                    activeObjectTop + activeObjectHeight / 2
                )
            ) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop + objectHeight / 2,
                    x1:
                        objectLeft < activeObjectLeft
                            ? objectLeft - objectWidth / 2 - aligningLineOffset
                            : objectLeft + objectWidth / 2 + aligningLineOffset,
                    x2:
                        activeObjectLeft > objectLeft
                            ? activeObjectLeft +
                            activeObjectWidth / 2 +
                            aligningLineOffset
                            : activeObjectLeft -
                            activeObjectWidth / 2 -
                            aligningLineOffset
                });
                activeObject.setPositionByOrigin(
                    new fabric.Point(
                        activeObjectLeft,
                        objectTop + objectHeight / 2 - activeObjectHeight / 2
                    ),
                    "center",
                    "center"
                );
            }
        }

        if (!horizontalInTheRange) {
            horizontalLines.length = 0;
        }

        if (!verticalInTheRange) {
            verticalLines.length = 0;
        }
    });

    canvas.on("before:render", function () {
        canvas.clearContext(canvas.contextTop);
    });

    canvas.on("after:render", function () {
        for (var i = verticalLines.length; i--;) {
            drawVerticalLine(verticalLines[i]);
        }
        for (var i = horizontalLines.length; i--;) {
            drawHorizontalLine(horizontalLines[i]);
        }

        verticalLines.length = horizontalLines.length = 0;
    });

    canvas.on("mouse:up", function () {
        verticalLines.length = horizontalLines.length = 0;
        canvas.renderAll();
    });
}

function findByClipName(name, canvas) {
    return _(canvas.getObjects())
        .where({
            clipFor: name
        })
        .first();
}

// Since the `angle` property of the Image object is stored
// in degrees, we'll use this to convert it to radians.
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function getObjectIcon(object) {
    console.log(object);
    if (!!object.text) {
        return "font-size";
    } else if (!!object.filters) {
        return "file-image";
    } else if (object.type === "group") {
        return "appstore";
    } else {
        return "appstore";
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(e, file) {
    console.log(e, file);
    const { i18n, lng } = e.context;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error(`${i18n.t("misc.uploadJPG", { lng })}`);
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 2MB!");
    // }
    return isJpgOrPng;
}

class MainEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionsVisible: false,
            activeAction: 4,
            data: [],
            activeGarment: null,
            selector: null,
            selectedObjectType: null,
            selectedColor: { hex: "#000" },
            error: false,
            errorMessage: "Invalid URL",
            mode: "BRANDIO Collaboration",
            selectedSide: 0,
            savedCanvas: {},
            canvass: [],
            collaboration: {},
            item: null,
            exportedImages: [],
            loading: false,
            pix: [],
            images: [],
            collaborationImages: [],
            searchText: "",
            modalVisible: false,
            uploading: false,
            scaling: false,
            deetsModalVisible: false,
            imageUrl: null,
            ageRange: 0,
            ageRangeText: "10s",
            groupSelected: false,
            multipleObjectsSelected: false,
            sidesModalVisible: false,
            exportingImages: false,
            collaborationObject: {},
            fandioGraphics: [],
            fandioGraphicsModalVisible: false,
            editingCustomName: false,
            customName: "New Custom Product",
            settingBackground: false,
            addingGraphic: false,
            params: { sel: "" },
            canvasUndoHistory: [],
            canvasRedoHistory: [],
            imgLoadFailed: false
        };
        this.toggleInstructions = this.toggleInstructions.bind(this);
    }

    static contextType = HeaderContext;

    toggleSettingBackgorund = () =>
        this.setState({ settingBackground: !this.state.settingBackground });

    toggleCustomNameEditing = () =>
        this.setState({ editingCustomName: !this.state.editingCustomName });
    handleCustomNameEditing = e =>
        this.setState({ customName: e.target.value });

    toggleSidesModal = () => {
        this.setState({ sidesModalVisible: !this.state.sidesModalVisible });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    handleDeetChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
    };

    componentDidMount = async () => {
        let item = await itemAPI.itemDetail(this.props.match.params.itemId);
        item = item.data.Data;
        this.setState({ item });

        let fandioGraphics = await illustrationAPI.getProduct();
        fandioGraphics = fandioGraphics.data.Data.illustProduct;
        this.setState({ fandioGraphics });

        let adminGraphics = await illustrationAPI.getAdminIllustrations();
        adminGraphics = adminGraphics.data.Data.illustrations;
        this.setState({ adminGraphics });

        axios
            .get(
                "https://pixabay.com/api/?key=13815519-16c6baf75c04ee9aa4939dbe6&image_type=vector&editors_choice=true"
            )
            .then(res => {
                this.setState({ pix: res.data.hits });
                this.getContentData(this.state.activeAction);
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .get(
                "https://pixabay.com/api/?key=13815519-16c6baf75c04ee9aa4939dbe6&editors_choice=true"
            )
            .then(res => {
                this.setState({ images: res.data.hits });
            })
            .catch(err => {
                console.log(err);
            });
        let canvass = this.state.canvass;
        const params = decodeURI(window.location.search)
            .replace("?", "")
            .split("&")
            .map(param => param.split("="))
            .reduce((values, [key, value]) => {
                values[key] = value;
                return values;
            }, {});

        console.log(params);

        switch (this.props.match.params.mode) {
            case "c":
                let cid = this.props.location.search
                    .split("?")[1]
                    .split("=")[1];
                let data = await collaborationAPI.getBaseProduct(cid);
                this.setState({
                    mode: "BRANDIO Collaboration",
                    collaborationImages: JSON.parse(
                        data.data.Data[0].collaboration_images
                    ),
                    collaborationInst:
                        data.data.Data[0].collaboration_description,
                    collaborationObject: data.data.Data[0]
                });

                JSON.parse(
                    this.state.collaborationObject.selected_printable_sides
                ).map((side, index) => {
                    console.log(index);
                    var canvas = new fabric.Canvas(`canvas-${index}`, {
                        preserveObjectStacking: true
                    });
                    initAligningGuidelines(canvas);
                    const ref = this;

                    // Note the use of the `originX` and `originY` properties, which we set
                    // to 'left' and 'top', respectively. This makes the math in the `clipTo`
                    // functions a little bit more straight-forward.
                    var clipRectangle = new fabric.Rect({
                        originX: "left",
                        originY: "top",
                        left: Number(item[`${side}ImgClipper`].split(",")[1]),
                        top: Number(item[`${side}ImgClipper`].split(",")[0]),
                        width: Number(item[`${side}ImgClipper`].split(",")[2]),
                        height: Number(item[`${side}ImgClipper`].split(",")[3]),
                        fill: "transparent",
                        /* use transparent for no fill */
                        // strokeDashArray: [10, 10],
                        // stroke: "black",
                        selectable: false,
                        rx: Number(item[`${side}ImgClipper`].split(",")[4]),
                        ry: Number(item[`${side}ImgClipper`].split(",")[4])
                    });
                    // We give these `Rect` objects a name property so the `clipTo` functions can
                    // find the one by which they want to be clipped.
                    clipRectangle.set({
                        clipFor: "layer"
                    });
                    canvas.add(clipRectangle);

                    canvas.on("mouse:down", function (options) {
                        if (options.target) {
                            switch (options.target.type) {
                                case "image":
                                    ref.setState({
                                        selectedObjectType: "Image"
                                    });
                                    break;
                                case "textbox":
                                    ref.setState({
                                        selectedObjectType: "Text"
                                    });
                                    break;
                                default:
                                    console.log("error");
                            }
                        }
                    });
                    canvas.on("selection:cleared", function (options) {
                        ref.setState({
                            selectedObjectType: null,
                            groupSelected: false,
                            multipleObjectsSelected: false
                        });
                    });

                    canvas.on("selection:created", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("selection:updated", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("object:scaling", function () {
                        ref.setState({ scaling: true });
                        let obj = canvas.getActiveObject();
                        ref.setState({
                            width: Math.floor(
                                obj.getScaledWidth() * 0.026458333 * 4.2
                            ),
                            height: Math.floor(
                                obj.getScaledHeight() * 0.026458333 * 4.2
                            )
                        });
                    });
                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    canvas.on("selection:created", function () {
                        canvas.getObjects().map(obj => {
                            if (obj.clipFor === "layer") {
                                obj.set({
                                    stroke: "black"
                                });
                            }
                        });
                    });

                    canvas.on("selection:cleared", function () {
                        canvas.getObjects().map(obj => {
                            if (obj.clipFor === "layer") {
                                obj.set({
                                    strokeDashArray: null,
                                    stroke: null
                                });
                            }
                        });
                    });

                    console.log(side, item[`${side}Img`]);

                    ref.setState({ settingBackground: true });

                    fabric.Image.fromURL(
                        "https://cors-anywhere.herokuapp.com/" +
                        item[`${side}Img`],
                        function (img) {
                            if (img && typeof (img) === typeof ({}) && Object.keys(img).length > 0) {
                                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                                    scaleX: canvas.width / img.width,
                                    scaleY: canvas.height / img.height
                                });
                            } else {
                                ref.setState({ settingBackground: false, imgLoadFailed: true });
                            }
                            ref.setState({ settingBackground: false });
                        },
                        { crossOrigin: "Anonymous" }
                    );
                    canvass.push(canvas);
                });
                break;
            case "i":
                this.setState({ mode: "BRANDIO Individual", params });

                this.state.params.sel.split(",").map((side, index) => {
                    console.log(index);
                    var canvas = new fabric.Canvas(`canvas-${index}`, {
                        preserveObjectStacking: true
                    });
                    initAligningGuidelines(canvas);
                    const ref = this;

                    // Note the use of the `originX` and `originY` properties, which we set
                    // to 'left' and 'top', respectively. This makes the math in the `clipTo`
                    // functions a little bit more straight-forward.
                    var clipRectangle = new fabric.Rect({
                        originX: "left",
                        originY: "top",
                        left: Number(item[`${side}ImgClipper`].split(",")[1]),
                        top: Number(item[`${side}ImgClipper`].split(",")[0]),
                        width: Number(item[`${side}ImgClipper`].split(",")[2]),
                        height: Number(item[`${side}ImgClipper`].split(",")[3]),
                        fill: "transparent",
                        /* use transparent for no fill */
                        // strokeDashArray: [10, 10],
                        // stroke: "black",
                        selectable: false,
                        rx: Number(item[`${side}ImgClipper`].split(",")[4]),
                        ry: Number(item[`${side}ImgClipper`].split(",")[4])
                    });
                    // We give these `Rect` objects a name property so the `clipTo` functions can
                    // find the one by which they want to be clipped.
                    clipRectangle.set({
                        clipFor: "layer"
                    });
                    canvas.add(clipRectangle);
                    canvas.on("mouse:down", function (options) {
                        if (options.target) {
                            switch (options.target.type) {
                                case "image":
                                    ref.setState({
                                        selectedObjectType: "Image"
                                    });
                                    break;
                                case "textbox":
                                    ref.setState({
                                        selectedObjectType: "Text"
                                    });
                                    break;
                                default:
                                    console.log("error");
                            }
                        }
                    });
                    canvas.on("selection:cleared", function (options) {
                        ref.setState({
                            selectedObjectType: null,
                            groupSelected: false,
                            multipleObjectsSelected: false
                        });
                    });

                    canvas.on("selection:created", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("selection:updated", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("object:scaling", function () {
                        ref.setState({ scaling: true });
                        let obj = canvas.getActiveObject();
                        ref.setState({
                            width: Math.floor(
                                obj.getScaledWidth() * 0.026458333 * 4.2
                            ),
                            height: Math.floor(
                                obj.getScaledHeight() * 0.026458333 * 4.2
                            )
                        });
                    });
                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    console.log(side, item[`${side}Img`]);

                    ref.setState({ settingBackground: true });

                    fabric.Image.fromURL(
                        "https://cors-anywhere.herokuapp.com/" +
                        item[`${side}Img`],
                        function (img) {
                            if (img && typeof (img) === typeof ({}) && Object.keys(img).length > 0) {
                                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                                    scaleX: canvas.width / img.width,
                                    scaleY: canvas.height / img.height
                                });
                            } else {
                                ref.setState({ settingBackground: false, imgLoadFailed: true });
                            }
                            ref.setState({ settingBackground: false });
                        },
                        { crossOrigin: "Anonymous" }
                    );
                    canvass.push(canvas);
                });
                break;
            case "cu":
                this.setState({ mode: "FANDIO Custom", params });

                item.printableSides.map((side, index) => {
                    console.log(index);
                    var canvas = new fabric.Canvas(`canvas-${index}`, {
                        preserveObjectStacking: true
                    });
                    const ref = this;
                    canvas.on("mouse:down", function (options) {
                        if (options.target) {
                            switch (options.target.type) {
                                case "image":
                                    ref.setState({
                                        selectedObjectType: "Image"
                                    });
                                    break;
                                case "textbox":
                                    ref.setState({
                                        selectedObjectType: "Text"
                                    });
                                    break;
                                default:
                                    console.log("error");
                            }
                        }
                    });
                    canvas.on("selection:cleared", function (options) {
                        ref.setState({
                            selectedObjectType: null,
                            groupSelected: false,
                            multipleObjectsSelected: false
                        });
                    });

                    canvas.on("selection:created", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("selection:updated", function (e) {
                        console.log(e);
                        if (e.selected.length > 1) {
                            ref.setState({ multipleObjectsSelected: true });
                        } else {
                            ref.setState({ multipleObjectsSelected: false });
                            if (e.selected[0].type === "group") {
                                ref.setState({ groupSelected: true });
                            }
                        }
                    });

                    canvas.on("object:scaling", function () {
                        ref.setState({ scaling: true });
                        let obj = canvas.getActiveObject();
                        ref.setState({
                            width: Math.floor(
                                obj.getScaledWidth() * 0.026458333 * 4.2
                            ),
                            height: Math.floor(
                                obj.getScaledHeight() * 0.026458333 * 4.2
                            )
                        });
                    });
                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    canvas.on("object:scaled", function () {
                        ref.setState({ scaling: false });
                    });

                    console.log(side, item[`${side}Img`]);

                    ref.setState({ settingBackground: true });

                    fabric.Image.fromURL(
                        "https://cors-anywhere.herokuapp.com/" +
                        item[`${side}Img`],
                        function (img) {
                            if (img && typeof (img) === typeof ({}) && Object.keys(img).length > 0) {
                                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                                    scaleX: canvas.width / img.width,
                                    scaleY: canvas.height / img.height
                                });
                            } else {
                                ref.setState({ settingBackground: false, imgLoadFailed: true });
                            }
                            ref.setState({ settingBackground: false });
                        },
                        { crossOrigin: "Anonymous" }
                    );
                    canvass.push(canvas);
                });
                break;
            default:
                this.setState({ mode: "FANDIO Custom", params });
        }
        this.setState(
            {
                canvass,
                canvas: canvass[0],
                canvasUndoHistory: [],
                canvasRedoHistory: []
            },
            () => this.pushToHistory()
        );
    };

    componentDidUpdate() { }

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    toggleFandioModal = () => {
        this.setState({
            fandioGraphicsModalVisible: !this.state.fandioGraphicsModalVisible
        });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    };

    toggleDeetsModal = () => {
        this.setState({ deetsModalVisible: !this.state.deetsModalVisible });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    setBackground = url => {
        let canvas = this.state.canvas;
        fabric.Image.fromURL(
            url,
            function (img) {
                // add background image
                if (img && typeof (img) === typeof ({}) && Object.keys(img).length > 0) {
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height
                    });
                } else {
                    this.setState({ imgLoadFailed: true });
                }
            },
            { crossOrigin: "Anonymous" }
        );
    };

    clipByName = (object, ctx, canvas = this.state.canvas) => {
        object.setCoords();
        var clipRect = canvas.getObjects()[0];
        console.log(clipRect);
        var scaleXTo1 = 1 / object.scaleX;
        var scaleYTo1 = 1 / object.scaleY;
        ctx.save();

        var ctxLeft = -(object.width / 2) + clipRect.strokeWidth;
        var ctxTop = -(object.height / 2) + clipRect.strokeWidth;
        var ctxWidth = clipRect.width - clipRect.strokeWidth;
        var ctxHeight = clipRect.height - clipRect.strokeWidth;

        ctx.translate(ctxLeft, ctxTop);
        ctx.scale(scaleXTo1, scaleYTo1);
        ctx.rotate(degToRad(object.angle * -1));

        ctx.beginPath();
        ctx.rect(
            clipRect.left - object.oCoords.tl.x,
            clipRect.top - object.oCoords.tl.y,
            clipRect.width,
            clipRect.height
        );
        ctx.closePath();
        ctx.restore();
    };

    save = async addToCart => {
        const { i18n, lng } = this.context;
        window.scrollTo(0, 0);
        let illustrationsUsed = [];
        this.state.canvass.map(canvas => {
            canvas.getObjects().map((obj, index) => {
                let graphic = {};
                if (obj.graphicType === "fandioGraphic") {
                    graphic.id = obj.graphicDetails.id;
                    graphic.price = obj.graphicDetails.price;
                    illustrationsUsed.push(graphic);
                }
            });
        });
        if (!!this.state.imageUrl) {
            const ref = this;
            this.setState({ exportingImages: true });
            if (this.state.mode === "BRANDIO Individual") {
                this.state.params.sel.split(",").map((u, i) => {
                    let canvas = this.state.canvas;
                    canvas.discardActiveObject().renderAll();
                    document.getElementById(`area-${i}`).style.display =
                        "block";
                    html2canvas(document.getElementById(`area-${i}`), {
                        useCORS: true,
                        allowTaint: true,
                        logging: true
                    }).then(async function (canvas) {
                        let dataURL = canvas.toDataURL("image/jpeg", 0.5);
                        ref.setState({ loading: true });
                        axios
                            .post(
                                "https://devfandio.collartt.com/api/upload-base64",
                                {
                                    base64: dataURL
                                }
                            )
                            .then(async res => {
                                let exportedImages = ref.state.exportedImages;
                                exportedImages.push(res.data.fileurl);
                                ref.setState({ exportedImages });
                                if (
                                    ref.state.params.sel.split(",").length ===
                                    exportedImages.length
                                ) {
                                    ref.setState({ loading: false });
                                    console.log("here");
                                    const data = {};
                                    data.brandId = ref.state.params.brand;
                                    data.categoryId =
                                        ref.state.params.category_id;
                                    data.productName = ref.state.params.name;
                                    data.price = Number(ref.state.params.price);
                                    data.exportedImages = exportedImages;
                                    data.descImg = ref.state.imageUrl;
                                    data.ageRange = ref.state.ageRange;
                                    data.itemId = ref.state.params.item;
                                    data.illustrationsUsed = illustrationsUsed;
                                    data.printableSides = ref.state.params.sel.split(
                                        ","
                                    );

                                    const response = await individualAPI.createProduct(
                                        data
                                    );
                                    if (response.status === 200) {
                                        message.success(
                                            `${i18n.t("misc.prodCreate", {
                                                lng
                                            })}`
                                        );
                                        setTimeout(() => {
                                            window.location.href =
                                                "/myinfo/mybrands";
                                        }, 2000);
                                    }
                                    console.log(response);
                                }
                            })
                            .catch(err => console.log(err));
                    });
                });
            } else if (this.state.mode === "BRANDIO Collaboration") {
                JSON.parse(
                    this.state.collaborationObject.selected_printable_sides
                ).map((u, i) => {
                    let canvas = this.state.canvas;
                    canvas.discardActiveObject().renderAll();
                    document.getElementById(`area-${i}`).style.display =
                        "block";
                    html2canvas(document.getElementById(`area-${i}`), {
                        useCORS: true,
                        allowTaint: true,
                        logging: true
                    }).then(async function (canvas) {
                        let dataURL = canvas.toDataURL("image/jpeg", 0.5);
                        ref.setState({ loading: true });
                        axios
                            .post(
                                "https://devfandio.collartt.com/api/upload-base64",
                                {
                                    base64: dataURL
                                }
                            )
                            .then(async res => {
                                let exportedImages = ref.state.exportedImages;
                                exportedImages.push(res.data.fileurl);
                                ref.setState({ exportedImages });
                                if (
                                    JSON.parse(
                                        ref.state.collaborationObject
                                            .selected_printable_sides
                                    ).length === exportedImages.length
                                ) {
                                    ref.setState({ loading: false });
                                    let data = await collaborationAPI.offer(
                                        ref.props.location.search
                                            .split("?")[1]
                                            .split("=")[1],
                                        {
                                            exportedImages,
                                            descImg: ref.state.imageUrl,
                                            ageRange: ref.state.ageRange,
                                            illustrationsUsed
                                        }
                                    );
                                    if (data.status == 200) {
                                        message.success(
                                            `${i18n.t("misc.designSendOwnr", {
                                                lng
                                            })}`
                                        );
                                        setTimeout(() => {
                                            window.location.href =
                                                "/myinfo/mybrands";
                                        }, 2000);
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                    });
                });
            } else {
                this.state.item.printableSides.map((u, i) => {
                    let canvas = this.state.canvas;
                    canvas.discardActiveObject().renderAll();
                    document.getElementById(`area-${i}`).style.display =
                        "block";
                    html2canvas(document.getElementById(`area-${i}`), {
                        useCORS: true,
                        allowTaint: true,
                        logging: true
                    }).then(async function (canvas) {
                        let dataURL = canvas.toDataURL("image/jpeg", 0.5);
                        ref.setState({ loading: true });
                        axios
                            .post(
                                "https://devfandio.collartt.com/api/upload-base64",
                                {
                                    base64: dataURL
                                }
                            )
                            .then(async res => {
                                let exportedImages = ref.state.exportedImages;
                                exportedImages.push(res.data.fileurl);
                                ref.setState({ exportedImages });
                                if (
                                    ref.state.item.printableSides.length ===
                                    exportedImages.length
                                ) {
                                    ref.setState({ loading: false });

                                    if (
                                        ref.state.mode === "BRANDIO Individual"
                                    ) {
                                        console.log("here");
                                        const data = {};
                                        data.brandId = ref.state.params.brand;
                                        data.categoryId =
                                            ref.state.params.category_id;
                                        data.productName =
                                            ref.state.params.name;
                                        data.price = Number(
                                            ref.state.params.price
                                        );
                                        data.exportedImages = exportedImages;
                                        data.descImg = ref.state.imageUrl;
                                        data.ageRange = ref.state.ageRange;
                                        data.itemId = ref.state.params.item;
                                        data.illustrationsUsed = illustrationsUsed;
                                        data.printableSides = ref.state.params.sel.split(
                                            ","
                                        );

                                        const response = await individualAPI.createProduct(
                                            data
                                        );
                                        if (response.status === 200) {
                                            message.success(
                                                `${i18n.t("misc.prodCreate", {
                                                    lng
                                                })}`
                                            );
                                            setTimeout(() => {
                                                // window.location.href = "/myinfo/mybrands";
                                            }, 2000);
                                        }
                                        console.log(response);
                                    } else if (
                                        ref.state.mode ===
                                        "BRANDIO Collaboration"
                                    ) {
                                        console.log("I'm here");
                                        let data = await collaborationAPI.offer(
                                            ref.props.location.search
                                                .split("?")[1]
                                                .split("=")[1],
                                            {
                                                exportedImages,
                                                descImg: ref.state.imageUrl,
                                                ageRange: ref.state.ageRange,
                                                illustrationsUsed
                                            }
                                        );
                                        if (data.status == 200) {
                                            message.success(
                                                `${i18n.t("misc.createBrand", {
                                                    lng
                                                })}`
                                            );
                                            setTimeout(() => {
                                                window.location.href =
                                                    "/myinfo/mybrands";
                                            }, 2000);
                                        }
                                    } else {
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        } else {
            message.info(`${i18n.t("misc.uploadImg", { lng })}`);
            this.toggleDeetsModal();
        }
    };

    pushToHistory = () => {
        setTimeout(() => {
            const canvas = this.state.canvas;
            let canvasHistory = [];
            canvas.getObjects().map(item => {
                if (item.clipName === "layer") {
                    item.clipTo = null;
                }
            });
            canvasHistory = [
                ...this.state.canvasUndoHistory,
                JSON.stringify(canvas.toJSON())
            ];
            const ref = this;
            this.setState({ canvasUndoHistory: [...canvasHistory] }, () => {
                canvas.getObjects().map(item => {
                    if (item.clipName === "layer") {
                        item.clipTo = function (ctx) {
                            return ref.clipByName(item, ctx, canvas);
                        };
                    }
                });
            });
        }, 1000);
    };

    pushToRedo = obj => {
        let { canvasRedoHistory } = this.state;
        canvasRedoHistory.push(obj);
        this.setState({ canvasRedoHistory });
    };

    undoCanvas = async () => {
        const ref = this;
        let canvas = this.state.canvas;
        let { canvasUndoHistory } = this.state;
        await this.pushToRedo(canvasUndoHistory[canvasUndoHistory.length - 1]);
        canvasUndoHistory.pop();
        // canvas.clear();
        canvas.loadFromJSON(
            canvasUndoHistory[canvasUndoHistory.length - 1],
            () => {
                this.setState({ canvasUndoHistory });
                const objects = canvas.getObjects();
                objects[0].selectable = false;
                canvas.getObjects().map((item, index) => {
                    if (index !== 0) {
                        item.clipName = "layer";
                        item.clipTo = function (ctx) {
                            return ref.clipByName(item, ctx, canvas);
                        };
                    }
                });
                canvas.renderAll();
            }
        );
    };

    redoCanvas = () => {
        const ref = this;
        let canvas = this.state.canvas;
        let { canvasRedoHistory } = this.state;

        // canvas.clear();
        canvas.loadFromJSON(
            canvasRedoHistory[canvasRedoHistory.length - 1],
            () => {
                canvasRedoHistory.pop();
                this.setState({ canvasRedoHistory });
                const objects = canvas.getObjects();
                objects[0].selectable = false;
                canvas.getObjects().map((item, index) => {
                    if (index !== 0) {
                        item.clipName = "layer";
                        item.clipTo = function (ctx) {
                            return ref.clipByName(item, ctx, canvas);
                        };
                    }
                });
                canvas.renderAll();
                this.pushToHistory();
            }
        );
    };

    addGraphic = (url, type, isFandio, graphicObj) => {
        this.setState({ addingGraphic: true });
        if (type === "c") {
            let canvas = this.state.canvas;
            const ref = this;
            fabric.Image.fromURL(
                "https://cors-anywhere.herokuapp.com/" + url,
                function (img) {
                    img.clipName = "layer";
                    img.clipTo = function (ctx) {
                        return ref.clipByName(this, ctx, canvas);
                    };
                    canvas.add(img);
                    ref.setState({ uploading: false });
                    ref.setState({ addingGraphic: false });
                },
                {
                    crossOrigin: "Anonymous",
                    scaleX: 0.3,
                    scaleY: 0.3,
                    left: 220,
                    top: 210,
                    graphicType: isFandio ? "fandioGraphic" : "freeGraphic",
                    graphicDetails: isFandio
                        ? { id: graphicObj.id, price: graphicObj.price }
                        : null
                }
            );
        } else {
            let canvas = this.state.canvas;
            const ref = this;
            fabric.Image.fromURL(
                url,
                function (img) {
                    img.clipName = "layer";
                    img.clipTo = function (ctx) {
                        return ref.clipByName(this, ctx, canvas);
                    };
                    canvas.add(img);
                    ref.setState({ uploading: false });
                    ref.setState({ addingGraphic: false });
                },
                {
                    crossOrigin: "Anonymous",
                    scaleX: 0.3,
                    scaleY: 0.3,
                    left: 220,
                    top: 210,
                    graphicType: isFandio ? "fandioGraphic" : "freeGraphic",
                    graphicDetails: isFandio
                        ? { id: graphicObj.id, price: graphicObj.price }
                        : null
                }
            );
        }
        this.pushToHistory();
    };

    addText = () => {
        var canvas = this.state.canvas;
        const ref = this;
        var text = new fabric.Textbox("Text", {
            left: 260,
            top: 250,
            fontFamily: "Roboto",
            clipName: "layer",
            clipTo: function (ctx) {
                return ref.clipByName(this, ctx, canvas);
            }
        });
        // text.clipPath = canvas.getObjects()[0];
        canvas.add(text);
        canvas.setActiveObject(text);
        this.setState({ selectedObjectType: "Text" });
        this.pushToHistory();
    };

    changeSelectedSide = side => {
        this.setState(
            prevState => {
                return {
                    selectedSide: side,
                    canvas: this.state.canvass[side],
                    canvasUndoHistory: [],
                    canvasRedoHistory: []
                };
            },
            () => {
                const canvas = this.state.canvas;
                canvas.discardActiveObject().renderAll();
                this.pushToHistory();
            }
        );
        // const canvas = this.state.canvas;
        // const canvasJSON = canvas.toJSON();
        // console.log(canvasJSON);
        // canvas.clear();
        // if (!!this.state.savedCanvas.side) {
        //   canvas.loadFromJSON(
        //     this.state.savedCanvas.side,
        //     canvas.renderAll.bind(canvas)
        //   );
        // } else {
        //   var newCanvas = new fabric.Canvas("canvas");
        //   fabric.Image.fromURL(
        //     garment.urls[side],
        //     function(img) {
        //       // add background image
        //       newCanvas.setBackgroundImage(
        //         img,
        //         newCanvas.renderAll.bind(newCanvas),
        //         {
        //           scaleX: newCanvas.width / img.width,
        //           scaleY: newCanvas.height / img.height
        //         }
        //       );
        //     },
        //     { crossOrigin: "Anonymous" }
        //   );
        // }
    };

    changeAlignment = alignment => {
        let canvas = this.state.canvas;
        let textbox = canvas.getActiveObject();
        canvas.remove(canvas.getActiveObject());
        switch (alignment) {
            case 0:
                textbox.set("textAlign", "left");
                break;
            case 1:
                textbox.set("textAlign", "center");
                break;
            case 2:
                textbox.set("textAlign", "right");
                break;
        }

        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        this.setState({ selectedObjectType: "Text" });
        this.pushToHistory();
    };

    toggleInstructions() {
        console.log("ok");
        this.setState({ instructionsVisible: !this.state.instructionsVisible });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    getContentData(option) {
        switch (option) {
            case 1:
                this.setState({ data: null, selector: this.setBackground });
                break;
            case 2:
                this.setState({
                    data: this.state.images,
                    selector: this.addGraphic
                });
                break;
            case 3:
                this.addText();
                break;
            case 4:
                this.setState({
                    data: this.state.pix,
                    selector: this.addGraphic
                });
                break;
            default:
                this.setState({ data: [] });
        }
    }

    changeActiveAction = option => {
        this.setState({ activeAction: option, searchText: "" });
        this.getContentData(option);
    };

    changeFont = font => {
        let canvas = this.state.canvas;
        let textbox = canvas.getActiveObject();
        this.setState({ selectedFont: font });
        textbox.set("fontFamily", font);
        canvas.remove(canvas.getActiveObject());
        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        this.setState({ selectedObjectType: "Text" });
        this.pushToHistory();
    };

    changeColor = color => {
        let canvas = this.state.canvas;
        let textbox = canvas.getActiveObject();
        canvas.remove(canvas.getActiveObject());
        this.setState({ selectedColor: color, selectedObjectType: "Text" });
        textbox.set(
            "fill",
            `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`
        );
        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        this.pushToHistory();
    };

    handleKeyPress = event => {
        let canvas = this.state.canvas;
        switch (event.key) {
            case "Backspace":
                break;
            default:
                console.log("nothing to delete");
        }
    };

    uploadFile = async file => {
        console.log(file);
        this.setState({ uploading: true });
        let response = await commmonAPI.imageUpload({ file });
        if (response.status === 200) {
            this.addGraphic(response.data.fileurl, "c");
        }
    };

    handleSearchTextChange = async e => {
        this.setState({ searchText: e.target.value, loadingImages: true });

        if (e.target.value === "") {
            let adminGraphics = await illustrationAPI.getAdminIllustrations();
            adminGraphics = adminGraphics.data.Data.illustrations;
            this.setState({ adminGraphics, loadingImages: false });
        } else {
            let adminGraphics = await illustrationAPI.getAdminIllustrations(
                e.target.value
            );
            adminGraphics = adminGraphics.data.Data.illustrations;
            this.setState({ adminGraphics, loadingImages: false });
        }
    };

    removeObject = () => {
        let canvas = this.state.canvas;
        canvas.remove(canvas.getActiveObject());
        this.pushToHistory();
    };

    moveUp = () => {
        let canvas = this.state.canvas;
        if (canvas.getObjects().indexOf(canvas.getActiveObject()) - 1 > 0) {
            canvas.sendBackwards(canvas.getActiveObject());
        }
        this.pushToHistory();
    };

    moveDown = () => {
        let canvas = this.state.canvas;
        canvas.bringForward(canvas.getActiveObject());
        this.pushToHistory();
    };

    group = () => {
        var canvas = this.state.canvas;
        var activeObj = canvas.getActiveObject();
        console.log(activeObj._objects.length);
        var activegroup = activeObj.toGroup();
        var objectsInGroup = activegroup.getObjects();
        activegroup.clone(function (newgroup) {
            canvas.remove(activegroup);
            objectsInGroup.forEach(function (object) {
                canvas.remove(object);
            });
            canvas.add(newgroup);
            this.pushToHistory();
        });
    };

    unGroup = () => {
        var canvas = this.state.canvas;
        var activeObject = canvas.getActiveObject();
        if (activeObject.type == "group") {
            var items = activeObject._objects;
            activeObject._restoreObjectsState();
            canvas.remove(activeObject);
            for (var i = 0; i < items.length; i++) {
                canvas.add(items[i]);
                canvas.item(canvas.size() - 1).hasControls = true;
            }

            canvas.renderAll();
            this.pushToHistory();
        }
    };

    render() {
        const {
            activeAction,
            selectedObjectType,
            selectedColor,
            selectedFont,
            mode,
            selectedSide,
            item,
            canvasUndoHistory,
            canvasRedoHistory,
            imgLoadFailed
        } = this.state;
        const { lng, i18n } = this.context;

        const objects = this.state.canvas && this.state.canvas.getObjects();

        const menu = (
            <Menu
                onClick={e => {
                    this.setState({ ageRange: Number(e.key) });
                }}
            >
                <Menu.Item
                    key="0"
                    onClick={() => this.setState({ ageRangeText: "10s" })}
                >
                    {i18n.t("mainEditor.ageRange10s", {
                        lng
                    })}
                </Menu.Item>
                <Menu.Item
                    key="1"
                    onClick={() => this.setState({ ageRangeText: "20s" })}
                >
                    {i18n.t("mainEditor.ageRange20s", {
                        lng
                    })}
                </Menu.Item>
                <Menu.Item
                    key="2"
                    onClick={() => this.setState({ ageRangeText: "30s" })}
                >
                    {i18n.t("mainEditor.ageRange30s", {
                        lng
                    })}
                </Menu.Item>
                <Menu.Item
                    key="3"
                    onClick={() => this.setState({ ageRangeText: "40s+" })}
                >
                    {i18n.t("mainEditor.ageRange40+", {
                        lng
                    })}
                </Menu.Item>
            </Menu>
        );

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">
                    {i18n.t("mainEditor.upload", {
                        lng
                    })}
                </div>
            </div>
        );
        if (this.state.item) {
            return (
                // <div className="editor" onKeyDown={this.handleKeyPress} tabindex="0">
                //   <div className="editor--main">
                //     <div className="editor--content-bar">
                //       {/* <ContentBar
                //         data={this.state.data}
                //         selector={this.state.selector}
                //         collaborationImages={this.state.collaborationImages}
                //         searchText={this.state.searchText}
                //         handleSearchTextChange={this.handleSearchTextChange}
                //       /> */}
                //     </div>
                // <div className="editor--display">
                //   <Display
                //     activeGarment={this.state.activeGarment}
                //     garment={garment}
                //     selectedSide={selectedSide}
                //     item={item}
                //   />
                // </div>

                // <div className="editor--content-selector">
                //   <ContentSelector
                //     activeAction={activeAction}
                //     changeActiveAction={this.changeActiveAction}
                //     uploadFile={this.uploadFile}
                //     toggleModal={this.toggleModal}
                //     toggleDeetsModal={this.toggleDeetsModal}
                //   />
                // </div>
                // <div className="editor--right-bar">
                //   {this.state.item && (
                //     <RightBar
                //       save={this.save}
                //       selectedObjectType={selectedObjectType}
                //       changeFont={this.changeFont}
                //       changeColor={this.changeColor}
                //       changeAlignment={this.changeAlignment}
                //       selectedColor={selectedColor}
                //       selectedFont={selectedFont}
                //       garment={garment}
                //       selectedSide={selectedSide}
                //       changeSelectedSide={this.changeSelectedSide}
                //       mode={mode}
                //       item={this.state.item}
                //       toggleInstructions={this.toggleInstructions}
                //       params={this.state.params}
                //     />
                //   )}
                // </div>
                //   </div>
                // <Modal
                //   title="Fandio Vector Library"
                //   centered
                //   visible={this.state.modalVisible}
                //   width="1000px"
                //   onCancel={this.toggleModal}
                //   onOk={this.toggleModal}
                // >
                //   <Input
                //     prefix={<Icon type="search" />}
                //     placeholder="Try flowers, cars.."
                //     value={this.state.searchText}
                //     onChange={this.handleSearchTextChange}
                //     style={{ marginBottom: "30px" }}
                //   />
                //   {this.state.mode === "BRANDIO Collaboration" &&
                //     this.state.collaborationImages.map(i => (
                //       <div
                //         style={{
                //           width: "100px",
                //           height: "100px",
                //           backgroundImage: `url(${i})`,
                //           backgroundSize: "cover"
                //         }}
                //         onClick={() => {
                //           this.addGraphic(i, "c");
                //           this.toggleModal();
                //         }}
                //       ></div>
                //     ))}
                //   {this.state.data.length > 0 ? (
                //     <div className="modal-grid">
                //       {this.state.data.map(d => (
                //         <div
                //           style={{
                //             width: "100%",
                //             height: "100%",
                //             backgroundImage: `url(${d.webformatURL})`,
                //             backgroundSize: "cover"
                //           }}
                //           onClick={() => {
                //             this.addGraphic(d.webformatURL);
                //             this.toggleModal();
                //           }}
                //         ></div>
                //       ))}
                //     </div>
                //   ) : (
                //     <Empty />
                //   )}
                // </Modal>
                // <Modal
                //   visible={this.state.uploading}
                //   footer={null}
                //   title={null}
                //   centered
                // >
                //   <p>Uploading image...</p>
                // </Modal>

                // {this.state.mode === "BRANDIO Collaboration" && (
                //   <Modal
                //     visible={this.state.instructionsVisible}
                //     footer={null}
                //     title="Collaboration Instructions"
                //     centered
                //     onCancel={this.toggleInstructions}
                //     onOk={this.toggleInstructions}
                //   >
                //     <p>{this.state.collaborationInst}</p>
                //   </Modal>
                // )}

                // <Modal
                //   visible={this.state.deetsModalVisible}
                //   title="Edit Product Details"
                //   centered
                //   onCancel={this.toggleDeetsModal}
                //   onOk={this.toggleDeetsModal}
                // >
                //   <p>Upload Detailed Image</p>
                //   <Upload
                //     name="image"
                //     listType="picture-card"
                //     className="avatar-uploader"
                //     showUploadList={false}
                //     action="https://devfandio.collartt.com/api/images-upload"
                //     beforeUpload={beforeUpload}
                //     onChange={this.handleChange}
                //     onSuccess={res => this.setState({ imageUrl: res.fileurl })}
                //   >
                //     {this.state.imageUrl ? (
                //       <img
                //         src={this.state.imageUrl}
                //         alt="avatar"
                //         style={{ width: "100%" }}
                //       />
                //     ) : (
                //       uploadButton
                //     )}
                //   </Upload>
                //   <p>Select Age Range</p>
                //   <Dropdown overlay={menu}>
                //     <Button>
                //       {this.state.ageRangeText} <Icon type="down" />
                //     </Button>
                //   </Dropdown>
                // </Modal>

                // <div className="toast-container">
                //   <div></div>
                //   <div></div>
                //   <div
                //     style={{ display: this.state.scaling ? "block" : "none" }}
                //     className="scaling-toast animated fadeIn faster"
                //   >
                //     <div className="toast-grid">
                //       <span>
                //         {this.state.width} cm x {this.state.height} cm
                //       </span>
                //     </div>
                //   </div>
                //   <div></div>
                // </div>
                // </div>
                <Fragment>
                    {objects && objects.length > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: 220,
                                left: 20,
                                width: "250px",
                                height: "300px",
                                background: "white",
                                padding: "20px",
                                borderRadius: "4px",
                                border: "1px solid #e4e4e4"
                            }}
                            className="animated fadeIn faster"
                        >
                            <p
                                style={{
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                    marginLeft: "10px"
                                }}
                            >
                                <strong>
                                    {i18n.t("mainEditor.layers", {
                                        lng
                                    })}{" "}
                                </strong>
                            </p>
                            <div
                                style={{
                                    overflowY: "auto",
                                    maxHeight: "220px",
                                    padding: "10px",
                                    borderTop: "1px solid #e4e4e4"
                                }}
                            >
                                {objects.reverse().map((object, index) => {
                                    if (index !== objects.length - 1) {
                                        return (
                                            <Button.Group
                                                style={{
                                                    width: "100%",
                                                    marginBottom: "10px"
                                                }}
                                                size="small"
                                            >
                                                <Button
                                                    disabled
                                                    type="dashed"
                                                    icon={getObjectIcon(object)}
                                                    style={{ width: "15%" }}
                                                ></Button>
                                                <Button
                                                    style={{ width: "70%" }}
                                                    onClick={() => {
                                                        this.state.canvas.setActiveObject(
                                                            object
                                                        );
                                                        if (
                                                            object.type ===
                                                            "textbox"
                                                        ) {
                                                            this.setState({
                                                                selectedObjectType:
                                                                    "Text"
                                                            });
                                                        } else if (
                                                            !!object.filters
                                                        ) {
                                                            this.setState({
                                                                selectedObjectType:
                                                                    "Image"
                                                            });
                                                        } else {
                                                            this.setState({
                                                                selectedObjectType:
                                                                    "Group"
                                                            });
                                                        }
                                                        this.state.canvas.renderAll();
                                                    }}
                                                    type="dashed"
                                                    disabled={
                                                        object.clipFor ===
                                                        "layer"
                                                    }
                                                >
                                                    {object.type === "textbox"
                                                        ? object.text
                                                        : object.clipFor ===
                                                            "layer"
                                                            ? "Canvas"
                                                            : object.type[0].toUpperCase() +
                                                            object.type.slice(1)}
                                                </Button>
                                                <Button
                                                    icon="delete"
                                                    style={{ width: "15%" }}
                                                    onClick={() => {
                                                        this.state.canvas.setActiveObject(
                                                            object
                                                        );
                                                        this.state.canvas.remove(
                                                            object
                                                        );
                                                    }}
                                                    type="danger"
                                                    disabled={
                                                        object.clipFor ===
                                                        "layer"
                                                    }
                                                ></Button>
                                            </Button.Group>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    )}

                    <div
                        className="new-editor"
                        onKeyDown={this.handleKeyPress}
                        tabindex="0"
                    >
                        <Modal
                            footer={null}
                            header={null}
                            visible={this.state.settingBackground}
                            centered
                            closeIcon={<div />}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr",
                                    gridTemplateColumns: "1fr"
                                }}
                            >
                                <div style={{ justifySelf: "center" }}>
                                    <br />
                                    <GridLoader width={130} />
                                    <br />
                                    <p>
                                        {i18n.t("mainEditor.settingUp", {
                                            lng
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            footer={null}
                            header={null}
                            visible={this.state.uploading}
                            centered
                            closeIcon={<div />}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr",
                                    gridTemplateColumns: "1fr"
                                }}
                            >
                                <div style={{ justifySelf: "center" }}>
                                    <br />
                                    <GridLoader width={130} />
                                    <br />
                                    <p>
                                        {i18n.t("mainEditor.uploadingImage", {
                                            lng
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            footer={null}
                            header={null}
                            visible={this.state.addingGraphic}
                            centered
                            closeIcon={<div />}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr",
                                    gridTemplateColumns: "1fr"
                                }}
                            >
                                <div style={{ justifySelf: "center" }}>
                                    <br />
                                    <GridLoader width={130} />
                                    <br />
                                    <p>
                                        {i18n.t("mainEditor.addingImage", {
                                            lng
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Modal>
                        <div className="new-editor-left">
                            <div className="new-editor-action-bar">
                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="undo"
                                        disabled={canvasUndoHistory.length < 2}
                                        onClick={this.undoCanvas}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.undo", {
                                            lng
                                        })}
                                    </span>
                                </div>

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="redo"
                                        disabled={canvasRedoHistory.length < 1}
                                        onClick={this.redoCanvas}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.redo", {
                                            lng
                                        })}
                                    </span>
                                </div>
                                <Divider type="vertical" />

                                {/* <div style={{ display: "grid", gridGap: "5px" }}>
                  <Button
                    type="default"
                    icon="zoom-in"
                    disabled
                    onClick={this.removeObject}
                  />
                  <span style={{ fontSize: "9px", textAlign: "center" }}>
                    {i18n.t("mainEditor.in", {
                      lng
                    })}
                  </span>
                </div>

                <div style={{ display: "grid", gridGap: "5px" }}>
                  <Button
                    type="default"
                    icon="zoom-out"
                    disabled
                    onClick={this.removeObject}
                  />
                  <span style={{ fontSize: "9px", textAlign: "center" }}>
                    {i18n.t("mainEditor.out", {
                      lng
                    })}
                  </span>
                </div>
                <Divider type="vertical" /> */}

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="delete"
                                        disabled={
                                            ["Image", "Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={this.removeObject}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.delete", {
                                            lng
                                        })}
                                    </span>
                                </div>
                                <Divider type="vertical" />

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="arrow-up"
                                        disabled={
                                            ["Image", "Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={this.moveDown}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.front", {
                                            lng
                                        })}
                                    </span>
                                </div>

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="arrow-down"
                                        disabled={
                                            ["Image", "Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={this.moveUp}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.back", {
                                            lng
                                        })}
                                    </span>
                                </div>
                                <Divider type="vertical" />

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="align-left"
                                        disabled={
                                            ["Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={() => this.changeAlignment(0)}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.left", {
                                            lng
                                        })}
                                    </span>
                                </div>

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="align-center"
                                        disabled={
                                            ["Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={() => this.changeAlignment(1)}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.center", {
                                            lng
                                        })}
                                    </span>
                                </div>

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="align-right"
                                        disabled={
                                            ["Text"].indexOf(
                                                this.state.selectedObjectType
                                            ) === -1
                                        }
                                        onClick={() => this.changeAlignment(2)}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.right", {
                                            lng
                                        })}
                                    </span>
                                </div>
                                <Divider type="vertical" />

                                <div
                                    style={{ display: "grid", gridGap: "5px" }}
                                >
                                    <Button
                                        type="default"
                                        icon="appstore"
                                        onClick={this.toggleSidesModal}
                                    />
                                    <span
                                        style={{
                                            fontSize: "9px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {i18n.t("mainEditor.sides", {
                                            lng
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="editor--display">
                                <Display
                                    activeGarment={this.state.activeGarment}
                                    garment={garment}
                                    selectedSide={selectedSide}
                                    item={item}
                                />

                                <div className="editor--content-selector">
                                    <ContentSelector
                                        activeAction={activeAction}
                                        changeActiveAction={
                                            this.changeActiveAction
                                        }
                                        uploadFile={this.uploadFile}
                                        toggleModal={this.toggleModal}
                                        toggleDeetsModal={this.toggleDeetsModal}
                                        mode={this.state.mode}
                                        toggleInstructions={
                                            this.toggleInstructions
                                        }
                                        toggleFandioModal={
                                            this.toggleFandioModal
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="editor--right-bar">
                            {this.state.item && (
                                <RightBar
                                    save={this.save}
                                    selectedObjectType={selectedObjectType}
                                    changeFont={this.changeFont}
                                    changeColor={this.changeColor}
                                    changeAlignment={this.changeAlignment}
                                    selectedColor={selectedColor}
                                    selectedFont={selectedFont}
                                    garment={garment}
                                    selectedSide={selectedSide}
                                    changeSelectedSide={this.changeSelectedSide}
                                    mode={mode}
                                    item={this.state.item}
                                    toggleInstructions={this.toggleInstructions}
                                    params={this.state.params}
                                    sidesModalVisible={
                                        this.state.sidesModalVisible
                                    }
                                    toggleSelectedSideModal={
                                        this.toggleSidesModal
                                    }
                                    collaborationObject={
                                        this.state.collaborationObject
                                    }
                                    toggleCustomNameEditing={
                                        this.toggleCustomNameEditing
                                    }
                                    customName={this.state.customName}
                                    handleCustomNameEditing={
                                        this.handleCustomNameEditing
                                    }
                                    editingCustomName={
                                        this.state.editingCustomName
                                    }
                                    productPrice={this.state.params.price}
                                />
                            )}
                        </div>
                        <div className="toast-container">
                            <div></div>
                            <div></div>
                            <div
                                style={{
                                    display: this.state.scaling
                                        ? "block"
                                        : "none"
                                }}
                                className="scaling-toast animated fadeIn faster"
                            >
                                <div className="toast-grid">
                                    <span>
                                        {this.state.width} cm x{" "}
                                        {this.state.height} cm
                                    </span>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <Modal
                            visible={this.state.deetsModalVisible}
                            title={i18n.t("mainEditor.editProductDetails", {
                                lng
                            })}
                            centered
                            onCancel={this.toggleDeetsModal}
                            onOk={this.toggleDeetsModal}
                        >
                            <p>
                                {i18n.t("mainEditor.uploadDetailedImage", {
                                    lng
                                })}
                            </p>
                            <br />
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://devfandio.collartt.com/api/images-upload"
                                beforeUpload={e => beforeUpload(this, e)}
                                onChange={this.handleChange}
                                onSuccess={res =>
                                    this.setState({ imageUrl: res.fileurl })
                                }
                            >
                                {this.state.imageUrl ? (
                                    <img
                                        src={this.state.imageUrl}
                                        alt="avatar"
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                        uploadButton
                                    )}
                            </Upload>
                            <p>
                                {i18n.t("mainEditor.selectAgeRange", {
                                    lng
                                })}
                            </p>
                            <br />
                            <Dropdown overlay={menu}>
                                <Button>
                                    {this.state.ageRangeText}{" "}
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </Modal>
                        {this.state.mode === "BRANDIO Collaboration" && (
                            <Modal
                                visible={this.state.instructionsVisible}
                                footer={null}
                                title={i18n.t(
                                    "mainEditor.collaborationInstructions",
                                    {
                                        lng
                                    }
                                )}
                                centered
                                onCancel={this.toggleInstructions}
                                onOk={this.toggleInstructions}
                            >
                                <p>{this.state.collaborationInst}</p>

                                <Divider />
                                <Fragment>
                                    {this.state.mode ===
                                        "BRANDIO Collaboration" && (
                                            <p>
                                                {i18n.t(
                                                    "mainEditor.imagesUploadedByOwner",
                                                    {
                                                        lng
                                                    }
                                                )}
                                            </p>
                                        )}
                                    <br />
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(4,1fr)",
                                            gridGap: "10px",
                                            gridTemplateRows: "100px"
                                        }}
                                    >
                                        {this.state.mode ===
                                            "BRANDIO Collaboration" &&
                                            this.state.collaborationImages.map(
                                                i => (
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${i})`,
                                                            backgroundSize:
                                                                "contain",
                                                            backgroundRepeat:
                                                                "no-repeat"
                                                        }}
                                                        onClick={() => {
                                                            this.addGraphic(
                                                                i,
                                                                "c"
                                                            );
                                                            this.toggleInstructions();
                                                        }}
                                                    ></div>
                                                )
                                            )}
                                    </div>
                                </Fragment>
                            </Modal>
                        )}
                        <Modal
                            title={i18n.t("mainEditor.free", {
                                lng
                            })}
                            centered
                            visible={this.state.modalVisible}
                            width="1000px"
                            onCancel={this.toggleModal}
                            onOk={this.toggleModal}
                            footer={null}
                        >
                            <Input
                                prefix={<Icon type="search" />}
                                placeholder={i18n.t("mainEditor.try", {
                                    lng
                                })}
                                value={this.state.searchText}
                                onChange={this.handleSearchTextChange}
                                style={{ marginBottom: "30px" }}
                            />

                            {this.state.data.length > 0 ? (
                                <div className="modal-grid">
                                    {this.state.loadingImages ? (
                                        <Fragment>
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                            <Skeleton
                                                paragraph={false}
                                                title={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                active
                                                className="ant-skeleton-full"
                                            />
                                        </Fragment>
                                    ) : (
                                            <Fragment>
                                                {this.state.adminGraphics.length ===
                                                    0 && (
                                                        <Empty
                                                            style={{
                                                                gridColumn: "span 4",
                                                                justifySelf: "center"
                                                            }}
                                                        />
                                                    )}
                                                {this.state.adminGraphics.map(d => (
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundImage: `url(${d.image})`,
                                                            backgroundSize: "cover",
                                                            border: "1px solid",
                                                            borderColor: "lightgray"
                                                        }}
                                                        onClick={() => {
                                                            this.addGraphic(
                                                                d.image,
                                                                "c"
                                                            );
                                                            this.toggleModal();
                                                        }}
                                                    ></div>
                                                ))}
                                            </Fragment>
                                        )}
                                </div>
                            ) : (
                                    <Empty />
                                )}
                        </Modal>

                        {/* __________________________________________________________________ */}

                        <Modal
                            title={i18n.t("mainEditor.fandioGraphicLibrary", {
                                lng
                            })}
                            centered
                            visible={this.state.fandioGraphicsModalVisible}
                            width="1000px"
                            onCancel={this.toggleFandioModal}
                            onOk={this.toggleFandioModal}
                            footer={null}
                        >
                            {this.state.fandioGraphics.length > 0 ? (
                                <div className="modal-grid">
                                    <Fragment>
                                        {this.state.fandioGraphics.map(d => (
                                            <div
                                                style={{ borderRadius: "4px" }}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundImage: `url(${d.image})`,
                                                        backgroundSize: "cover",
                                                        border:
                                                            "1px solid #e4e4e4",
                                                        borderRadius: "5px"
                                                    }}
                                                    onClick={() => {
                                                        this.addGraphic(
                                                            d.image,
                                                            "c",
                                                            true,
                                                            {
                                                                id: d.id,
                                                                price: Number(
                                                                    d.price
                                                                )
                                                            }
                                                        );
                                                        this.toggleFandioModal();
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "grid",
                                                            gridTemplateRows:
                                                                "1fr",
                                                            gridTemplateColumns:
                                                                "1fr 3fr 2fr",
                                                            backgroundColor:
                                                                "white",
                                                            padding: "5px"
                                                        }}
                                                    >
                                                        <img
                                                            src={d.profile_img}
                                                            width="23px"
                                                            style={{
                                                                borderRadius:
                                                                    "100%",
                                                                height: "23px",
                                                                alignSelf:
                                                                    "center"
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                alignSelf:
                                                                    "center"
                                                            }}
                                                        >
                                                            {d.nickname}
                                                        </span>
                                                        <span
                                                            style={{
                                                                textAlign:
                                                                    "right",
                                                                alignSelf:
                                                                    "center"
                                                            }}
                                                        >
                                                            <CurrencyFormat
                                                                value={
                                                                    lng === "kr"
                                                                        ? d.price
                                                                        : parseFloat(
                                                                            d.price *
                                                                            0.00085
                                                                        ).toFixed(
                                                                            2
                                                                        )
                                                                }
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                prefix={
                                                                    lng === "kr"
                                                                        ? `₩ `
                                                                        : `$ `
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Fragment>
                                </div>
                            ) : (
                                    <Empty />
                                )}
                        </Modal>

                        {/* __________________________________________________________________ */}

                        <Modal
                            visible={this.state.exportingImages}
                            footer={null}
                            title={null}
                            width={1000}
                            height={800}
                            centered
                        >
                            <div className="exporting-loader">
                                <div>
                                    <h2>
                                        {i18n.t("mainEditor.exportingImages", {
                                            lng
                                        })}
                                        ...
                                    </h2>
                                </div>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={40}
                                    color={"#000000"}
                                    loading={true}
                                />
                                {this.state.mode === "BRANDIO Individual" ? (
                                    <Progress
                                        percent={
                                            (parseFloat(
                                                this.state.exportedImages.length
                                            ) /
                                                this.state.params.sel.split(",")
                                                    .length) *
                                            100
                                        }
                                        status="active"
                                    />
                                ) : null}
                                {this.state.mode === "BRANDIO Collaboration" &&
                                    this.state.collaborationObject
                                        .selected_printable_sides ? (
                                        <Progress
                                            percent={
                                                (parseFloat(
                                                    this.state.exportedImages.length
                                                ) /
                                                    JSON.parse(
                                                        this.state
                                                            .collaborationObject
                                                            .selected_printable_sides
                                                    ).length) *
                                                100
                                            }
                                            status="active"
                                        />
                                    ) : null}

                                {/* {this.state.mode === "BRANDIO Collaboration" ? (
                <Progress
                  percent={
                    (parseFloat(
                      JSON.parse(
                        this.state.collaborationObject.printable_selected_sides
                      ).length
                    ) /
                      this.state.item.printableSides.length) *
                    100
                  }
                  status="active"
                />
              ) : null} */}
                            </div>
                        </Modal>
                    </div>
                    {imgLoadFailed ? <ImgFailed lng={lng} /> : ''}
                </Fragment>
            );
        } else {
            return <Loader />;
        }
    }
}

export default withRouter(MainEditor);

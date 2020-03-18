import MydioPage from "./../screens/MydioPage";
import BrandioPage from "./../screens/BrandioPage";
import BrandioIllustration from "./../screens/BrandioIllustration";
import BrandioMyBrands from "./../screens/BrandioMyBrands";
import BrandioMessage from "./../screens/BrandioMessage";

export const Routes = [
    {
        path: "/mydio",
        exact: true,
        Component: MydioPage
    },
    {
        path: "/",
        exact: true,
        Component: BrandioPage
    },
    {
        path: "/illustrations",
        exact: true,
        Component: BrandioIllustration
    },
    // {
    //   path: "/mybrands",
    //   exact: true,
    //   Component: BrandioMyBrands
    // },
    {
        path: "/inbox",
        exact: true,
        Component: BrandioMessage
    }
];

import React from 'react'
import Helmet from 'react-helmet'
import './Layout.scss'
import { siteMetaData } from '../config/siteMetaData'

interface LayoutProps {

}

class Layout extends React.Component {
    constructor (props: LayoutProps) {
        super(props);
    }

    render () {
        return (
            <div className="app-layout">
                <div className="app-layout-inner">
                    {
                        //@ts-ignore
                        <Helmet>
                            <title>{siteMetaData.title}</title>
                            <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,500,700,700i&display=swap" rel="stylesheet" />
                        </Helmet>
                    }

                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout;
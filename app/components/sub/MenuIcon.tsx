type OffCanvasMenuProps = {
    className?:string;
    toggleMenu: Function;
}

function MenuIcon({className, toggleMenu}: OffCanvasMenuProps) {
    return (
        <div className="offcanvas-menu">
            {/* hamburger */}
            <div onClick={() => toggleMenu()} className={className}>
                {/* <span className="text"> MENU </span> */}
                {/* <Text noMobile> MENU </Text> */}
                <div className="first"> </div>
                <div className="second" > </div>
                <div className="third"> </div>
            </div>
        </div>
    )
}

export default MenuIcon;
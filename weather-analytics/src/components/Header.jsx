function Header() {
return (
    <>
    <div className="header-container">
        <h1 className="header-title">Weather Analytics</h1>
        <div className="unit-toggle-container">
            <span className="unit-toggle-label">°C / °F</span>
            {/* Your toggle switch here */}
        </div>
    </div>
    </>
)
}
export default Header
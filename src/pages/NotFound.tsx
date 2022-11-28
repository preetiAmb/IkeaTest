import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

const NotFound: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h3">404 Page not found</Typography>
        </Box>
    );
};

export default NotFound;
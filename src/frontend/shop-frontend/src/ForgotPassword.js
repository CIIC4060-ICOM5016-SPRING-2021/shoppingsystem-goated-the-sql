import {Button, Card, CardContent, CardHeader, Container} from "semantic-ui-react";
import {Link} from "react-router-dom";
import React from "react";

function ForgotPassword() {
    return (
        <Container>
            <Card fluid raised>
                <CardHeader> esta BIIEEEEEn apretao pa</CardHeader>
                <CardContent>
                    <Button as={Link} to="/" color='red' style={{width: 300}}>
                        <p className={'Login'}>Back</p>
                    </Button>
                </CardContent>
            </Card>
        </Container>

    )
}

export default ForgotPassword;
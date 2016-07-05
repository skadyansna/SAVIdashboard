export OS_USERNAME=skadyan
export OS_PASSWORD=sna
export OS_REGION_NAME=EDGE-VC-1
export OS_TENANT_NAME=uvic
export OS_C=http://iam.savitestbed.ca:8777
export OS_AUTH_URL=http://iam.savitestbed.ca:5000/v2.0/
nova list|awk 'NR>3 {print $2}'
